import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { Achievement } from 'src/app/models';
import { AchievementsService, AuthenticationService } from 'src/app/services';
import { achievementById } from 'src/app/state/achievements/achivements.selector';

@Component({
  selector: 'team-achievement',
  template: `<div class="card mt-4">
    <ng-container *ngIf="achievement$ | async as achievement">
      <div class="card-header">
        <h4>{{ achievement.name }}</h4>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        [routerLink]="['../edit']"
        *ngIf="checkRole('ADMIN')"
      >
        Edit Achievement
      </button>
      <button
        type="button"
        class="btn btn-primary"
        (click)="removeAchievement()"
        *ngIf="checkRole('ADMIN')"
      >
        Remove Achievement
      </button>
      <div class="card-body">
        <div class="row">
          <div class="column">
            <ul class="list-group">
              <li class="list-group-item">
                <div>Name:</div>
                <div>{{ achievement.name }}</div>
              </li>
              <li class="list-group-item">
                <div>Description:</div>
                <div>{{ achievement.description }}</div>
              </li>
              <li class="list-group-item">
                <div>Points:</div>
                <div>{{ achievement.points }}</div>
              </li>
              <li class="list-group-item">
                <div>Achievement Type:</div>
                <div>{{ achievement.achievementType }}</div>
              </li>
              <li class="list-group-item">
                <div>Requires Verification:</div>
                <div>{{ achievement.requiresVerification ? 'Yes' : 'No' }}</div>
              </li>
            </ul>
          </div>
          <div class="column">
            <div class="col-6">
              <team-achievement-card
                [achievement]="achievement"
              ></team-achievement-card>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['../team-achievements.component.css'],
})
export class TeamAchievementComponent {
  achievement: Achievement;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private achievementsService: AchievementsService,
    private authService: AuthenticationService
  ) {}

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

  checkRole(role) {
    this.authService.checkRole(role);
  }

  ngOnInit() {
    this.getAchievements();
  }

  getAchievements() {
    this.achievementsService.getAchievements();
  }

  removeAchievement() {
    this.achievementsService.deleteAchievement(this.achievement._id);
    this.router.navigateByUrl('/achievements');
  }
}
