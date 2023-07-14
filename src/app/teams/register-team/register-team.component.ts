import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AchievementsService,
  MentorService,
  TeamService,
} from '../../services';
import { ToastService } from '../../global/toast/toast.service';
import { catchError, empty, of } from 'rxjs';
import { freeMentors } from 'src/app/state/mentors/mentors.selector';
import { Store } from '@ngrx/store';
import { allTeams } from 'src/app/state/teams/teams.selector';
import { Router } from '@angular/router';
import { Achievement, AssignedMentor, Mentor } from 'src/app/models';
import { MentorTeamService } from 'src/app/services/mentor-team.service';
import { allAchievements } from 'src/app/state/achievements/achivements.selector';
import { trigger, transition, style, animate } from '@angular/animations';
import { ColorCircleModule } from 'ngx-color/circle';

@Component({
  selector: 'register-team',
  template: `
    <div class="card">
      <h4 class="card-header">Register Team</h4>
      <div class="card-body">
        <form
          id="mentor-form"
          [formGroup]="teamForm"
          autocomplete="off"
          (submit)="submit()"
        >
          <div class="mb-3">
            <label class="form-label">Team Name</label>
            <input type="text" formControlName="name" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Table Number</label>
            <input
              type="text"
              formControlName="tableNumber"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Colour</label>
            <color-circle
              (onChangeComplete)="changeComplete($event)"
              formControlName="color"
            ></color-circle>
          </div>

          <div class="mb-3">
            <label class="form-label" for="assignedMentor"
              >Assigned Mentor</label
            >
            <select
              id="assignedMentor"
              class="form-select"
              formControlName="assignedMentor"
            >
              <option selected disabled>Select Mentor</option>
              <option
                *ngFor="let freeMentor of freeMentors$ | async"
                [ngValue]="{ _id: freeMentor._id, name: freeMentor.name }"
              >
                {{ freeMentor.name }}
              </option>
            </select>
          </div>
          <button
            class="btn btn-primary"
            type="submit"
            [disabled]="isButtonDisabled"
          >
            <div class="spinner-border" role="status" *ngIf="isButtonDisabled">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div *ngIf="!isButtonDisabled">Add Team</div>
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['register-team.component.css'],
})
export class RegisterTeamComponent implements OnInit {
  freeMentors$ = this.store.select(freeMentors);
  allTeams$ = this.store.select(allTeams);
  achievements$ = this.store.select(allAchievements);
  achievementsArr: Achievement[] = [];

  isButtonDisabled = false;
  mentorValues: Mentor;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private teamService: TeamService,
    private toastService: ToastService,
    private store: Store,
    private router: Router,
    private mentorTeamService: MentorTeamService,
    private achievementService: AchievementsService
  ) {
    this.getAchievements();
  }

  changeComplete(e) {
    console.log(e);
  }

  ngOnInit(): void {
    this.updateTeams();
    this.updateMentors();
  }

  updateTeams() {
    this.teamService.getTeams();
  }

  updateMentors() {
    this.mentorService.getMentors();
  }

  getAchievements() {
    this.achievementService.getAchievements();
    this.achievements$.subscribe((achievements) => {
      achievements.map((achievement) => {
        this.achievementsArr.push(achievement);
      });
    });
  }

  teamForm = this.fb.group({
    _id: [],
    name: ['', Validators.required],
    tableNumber: ['', Validators.required],
    score: [0],
    color: ['', Validators.required],
    assignedMentor: [{ _id: '', name: '' }, Validators.required],
    achievements: [this.achievementsArr],
  });

  submit() {
    console.log('submit');
    this.teamForm.markAllAsTouched();
    if (this.teamForm.valid && this.teamForm.value.assignedMentor?._id !== '') {
      this.isButtonDisabled = true;

      let formValues = this.teamForm.getRawValue();
      let result$ = this.teamService.addTeam(formValues);
      result$.subscribe((result: any) => {
        console.log('FORM RESULTTTT', result);
        if (result === null) {
          console.log(result.errorMessage);
          this.toastService.danger({
            text: 'Failed to add team',
          });
        } else {
          this.toastService.success({
            text: 'Team Added',
          });
          let assignedTeam = {
            _id: result._id!,
            name: formValues.name!,
          };
          console.log(assignedTeam);
          this.mentorTeamService.updateMentorsAssignedTeam(
            formValues.assignedMentor!._id,
            assignedTeam
          );
          this.teamForm.reset();
          this.updateTeams();
        }
      });
      this.isButtonDisabled = false;
    } else {
      this.toastService.danger({
        text: 'Form is Invalid',
      });
    }
  }
}
