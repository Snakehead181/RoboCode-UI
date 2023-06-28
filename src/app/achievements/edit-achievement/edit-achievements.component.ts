import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, catchError, map, of, switchMap } from 'rxjs';
import { ToastService } from 'src/app/global/toast/toast.service';
import { Achievement, AchievementType, Team } from 'src/app/models';
import { AchievementsService } from 'src/app/services';
import {
  achievementById,
  allAchievements,
} from 'src/app/state/achievements/achivements.selector';

@Component({
  selector: 'create-achievements',
  template: `<div class="card">
    <div class="card-header">
      <h4>Editing Achievement</h4>
      <button
        type="button"
        class="btn btn-primary"
        (click)="submit()"
        form="achievement-form"
      >
        Save Achievement
      </button>
    </div>
    <div class="row">
      <div class="column">
        <form id="achievement-form" [formGroup]="achievementForm">
          <ul class="list-group">
            <li class="list-group-item">
              <div>Name:</div>
              <input type="text" formControlName="name" class="form-control" />
            </li>
            <li class="list-group-item">
              <div>Description:</div>
              <input
                type="text"
                formControlName="description"
                class="form-control"
              />
            </li>
            <li class="list-group-item">
              <div>Points:</div>
              <input
                type="text"
                formControlName="points"
                class="form-control"
              />
            </li>
            <li class="list-group-item">
              <div>Achievement Type:</div>
              <select
                id="achievementType"
                class="form-select"
                formControlName="achievementType"
              >
                <option *ngFor="let type of achievementTypes" [ngValue]="type">
                  {{ type }}
                </option>
              </select>
            </li>
            <li class="list-group-item">
              <div>Requires Verification:</div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  [value]="true"
                  id="true-radio"
                  formControlName="requiresVerification"
                />
                <label class="form-check-label" for="true-radio"> Yes </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  [value]="false"
                  id="false-radio"
                  formControlName="requiresVerification"
                />
                <label class="form-check-label" for="false-radio"> No </label>
              </div>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>`,
  styleUrls: ['../achievements.component.css'],
})
export class EditAchievementComponent {
  achievementsState$ = this.store.select((s: any) => s.achievement);
  achievements$ = this.store.select(allAchievements);
  loading$ = this.achievementsState$.pipe(map((x: any) => x.loading));

  achievementSub: Subscription;
  achievement: Achievement;

  achievementTypes: AchievementType = [
    'Mentor Rating',
    'Trailblazer Challenge',
    'Team Target',
    'Bonus Award',
    'Mid-Day Military Excersise',
  ];

  achievementForm: FormGroup;

  achievement$ = this.route.params.pipe(
    switchMap((p) =>
      this.store.pipe(
        select(achievementById, p['id']),
        map((achievement) => {
          if (p['id'] && !achievement) {
            return null;
          }
          this.achievement = achievement!;
          return achievement ?? ({} as Achievement);
        })
      )
    )
  );

  constructor(
    private store: Store,
    private achievementsService: AchievementsService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.achievementsService.getAchievementDetails(route.snapshot.params['id']);

    this.achievementSub = this.achievement$.subscribe((achievement) => {
      this.achievementForm = this.fb.group({
        _id: [achievement?._id],
        name: [achievement?.name, Validators.required],
        description: [achievement?.description],
        points: [achievement?.points],
        achievementType: [achievement?.achievementType],
        requiresVerification: [
          achievement?.requiresVerification,
          Validators.required,
        ],
      });
    });
  }

  submit() {
    this.achievementForm.markAllAsTouched();
    if (this.achievementForm.valid) {
      let formValues = this.achievementForm.getRawValue();
      let result$ = this.achievementsService.updateAchievement(formValues);
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
      this.achievementForm.reset();
      this.router.navigateByUrl('achievements/' + this.achievement._id);
    }
  }
}
