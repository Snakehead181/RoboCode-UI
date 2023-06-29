import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MentorService, TeamService } from '../../services';
import { ToastService } from '../../global/toast/toast.service';
import { catchError, of } from 'rxjs';
import { freeMentors } from 'src/app/state/mentors/mentors.selector';
import { Store } from '@ngrx/store';
import { allTeams } from 'src/app/state/teams/teams.selector';
import { Router } from '@angular/router';
import { Mentor } from 'src/app/models';

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
            <input type="text" formControlName="color" class="form-control" />
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
              <option value="null">Select Mentor</option>
              <option
                *ngFor="let freeMentor of freeMentors$ | async"
                [ngValue]="freeMentor.name"
              >
                {{ freeMentor.name }}
              </option>
            </select>
          </div>
          <button class="btn btn-primary" type="submit">Add Team</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['register-team.component.css'],
})
export class RegisterTeamComponent implements OnInit {
  freeMentors$ = this.store.select(freeMentors);
  allTeams$ = this.store.select(allTeams);

  mentorValues: Mentor;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private teamService: TeamService,
    private toastService: ToastService,
    private store: Store,
    private router: Router
  ) {}

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

  teamForm = this.fb.group({
    name: ['', Validators.required],
    tableNumber: [''],
    score: [0],
    color: [''],
    assignedMentor: ['', Validators.required],
  });

  submit() {
    console.log('submit');
    this.teamForm.markAllAsTouched();
    if (this.teamForm.valid) {
      let formValues = this.teamForm.getRawValue();
      let result$ = this.teamService.addTeam(formValues);
      result$
        .pipe(
          catchError((err) => {
            return of({
              errorMessage: 'Adding a team failed',
              err,
            });
          })
        )
        .subscribe((result: any) => {
          if (result.errorMessage) {
            console.log(result.errorMessage);
            this.toastService.danger({
              text: 'Failed to add team',
            });
          } else {
            this.toastService.success({
              text: 'Team Added',
            });
          }
        });
      let assignedMentor = this.getMentor(formValues);
      let mentorRes$ = this.mentorService.updateMentor(assignedMentor);
      mentorRes$
        .pipe(
          catchError((err) => {
            return of({
              errorMessage: 'Assigning Team to Mentor Failed',
              err,
            });
          })
        )
        .subscribe((result: any) => {
          if (result.errorMessage) {
            console.log(result.errorMessage);
            this.toastService.danger({
              text: 'Failed to Assign to Mentor',
            });
          } else {
            this.toastService.success({
              text: 'Assigned to Mentor',
            });
          }
        });
      this.teamForm.reset();
      this.router.navigateByUrl('teams');
      this.updateTeams();
    }
  }

  getMentor(formValues): Mentor {
    this.freeMentors$.subscribe((mentors) => {
      for (let mentor of mentors) {
        if (mentor.name === formValues.assignedMentor) {
          console.log(mentor);
          return (this.mentorValues = {
            _id: mentor._id,
            name: mentor.name,
            username: mentor.username,
            password: mentor.password,
            assignedTeam: formValues.name,
            role: mentor.role,
            achievements: mentor.achievements,
            assignedTeamId: formValues._id,
          });
        }
      }
      return (this.mentorValues = {
        _id: '',
        name: '',
        assignedTeam: '',
        username: '',
        password: '',
        role: '',
        achievements: [],
        assignedTeamId: '',
      });
    });
    return this.mentorValues;
  }
}
