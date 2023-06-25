import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorService, TeamService } from '../../services';
import { ToastService } from '../../global/toast/toast.service';
import { Subscription, catchError, of } from 'rxjs';
import { freeMentors } from 'src/app/state/mentors/mentors.selector';
import { Store } from '@ngrx/store';
import { allTeams } from 'src/app/state/teams/teams.selector';

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
            <label class="form-label">Number</label>
            <input
              type="text"
              formControlName="number"
              class="form-control"
              [value]="(allTeams$ | async)!.length + 1"
              readonly
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

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private teamService: TeamService,
    private toastService: ToastService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.mentorService.getMentors();
  }

  teamForm = this.fb.group({
    name: ['', Validators.required],
    number: [''],
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
      this.teamForm.reset();
      this.teamService.getTeams();
    }
  }
}
