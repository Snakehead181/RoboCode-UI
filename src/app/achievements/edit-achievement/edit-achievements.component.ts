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
      <h4>Achievements</h4>
      <button
        type="button"
        class="btn btn-primary"
        (click)="submit()"
        form="achievement-form"
      >
        Save Achievement
      </button>
    </div>
    <form id="achievement-form" [formGroup]="achievementForm">
      <div class="mb-3">
        <label class="form-label">Achievement Name</label>
        <input type="text" formControlName="name" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <input type="text" formControlName="description" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">points</label>
        <input type="number" formControlName="points" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="achievementTypes"
          >Achievement Type</label
        >
        <select
          id="achievementTypes"
          class="form-select"
          formControlName="achievementType"
        >
          <option *ngFor="let type of achievementTypes" [ngValue]="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Requires Verification</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="true"
            id="true-radio"
            formControlName="requiresVerification"
          />
          <label class="form-check-label" for="true-radio"> Yes </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="false"
            id="false-radio"
            formControlName="requiresVerification"
          />
          <label class="form-check-label" for="false-radio"> No </label>
        </div>
      </div>
    </form>
  </div>`,
  styleUrls: ['../achievements.component.css'],
})
export class EditAchievementComponent implements OnInit {
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

  constructor(
    private store: Store,
    private achievementsService: AchievementsService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.achievementsService.getAchievementDetails(route.snapshot.params['id']);

    this.achievementSub = this.achievements$.subscribe((achievement) => {
      this.achievementForm = this.fb.group({
        name: [achievement, Validators.required],
        description: [''],
        points: [0],
        achievementType: [''],
        requiresVerification: ['', Validators.required],
      });
    });
  }

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

  ngOnInit() {
    this.getAchievements();
  }

  getAchievements() {
    this.achievementsService.getAchievements();
  }

  submit() {
    console.log('submit');
    this.achievementForm.markAllAsTouched();
    if (this.achievementForm.valid) {
      let formValues = this.achievementForm.getRawValue();
      console.log(formValues);
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
      this.router.navigateByUrl('achievements');
    }
  }
}
