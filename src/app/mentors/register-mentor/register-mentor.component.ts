import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AchievementsService, MentorService } from '../../services';
import { Router } from '@angular/router';
import { ToastService } from '../../global/toast/toast.service';
import { catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { allAchievements } from 'src/app/state/achievements/achivements.selector';
import { Achievement } from 'src/app/models';

@Component({
  selector: 'register-mentor',
  template: `
    <div class="card">
      <h4 class="card-header">Register Mentor</h4>
      <div class="card-body">
        <form
          id="mentor-form"
          [formGroup]="mentorForm"
          autocomplete="off"
          (submit)="submit()"
        >
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" formControlName="name" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input
              type="text"
              formControlName="username"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              formControlName="password"
              class="form-control"
            />
          </div>
          <button class="btn btn-primary" type="submit">Add Mentor</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['register-mentor.component.css'],
})
export class RegisterMentorComponent {
  achievementsArr: Achievement[];
  achievements$ = this.store.select(allAchievements);
  mentorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private toastService: ToastService,
    private store: Store,
    private achievementService: AchievementsService
  ) {
    this.achievementService.getAchievements();

    this.mentorForm = this.fb.group({
      name: [''],
      username: [''],
      password: [''],
      assignedTeam: [
        {
          _id: '',
          name: '',
        },
      ],
      role: ['MENTOR'],
    });
  }

  submit() {
    this.mentorForm.markAllAsTouched();
    if (this.mentorForm.valid) {
      let formValues = this.mentorForm.getRawValue();
      let result$ = this.mentorService.addMentor(formValues);
      result$
        .pipe(
          catchError((err) => {
            return of({
              errorMessage: 'Adding a mentor failed',
              err,
            });
          })
        )
        .subscribe((result: any) => {
          if (result.errorMessage) {
            this.toastService.danger({
              text: 'Failed to add mentor',
            });
          } else {
            this.toastService.success({
              text: 'Mentor Added',
            });
          }
        });
      this.mentorForm.reset();
      this.mentorService.getMentors();
    }
  }
}
