import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { Achievement, Team } from 'src/app/models';
import { AchievementsService, TeamService } from 'src/app/services';
import { achievementById } from 'src/app/state/achievements/achivements.selector';
import { teamById } from 'src/app/state/teams/teams.selector';

@Component({
  selector: 'achievement',
  template: `<div class="card mt-4">
    <ng-container *ngIf="achievement$ | async as achievement">
      <div class="card-header">
        <h4>{{ achievement.name }}</h4>
        <button type="button" class="btn btn-primary" [routerLink]="['edit']">
          Edit Achievement
        </button>
        <button
          type="button"
          class="btn btn-primary"
          (click)="removeAchievement()"
        >
          Remove Achievement
        </button>
      </div>
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
              <achievement-card [achievement]="achievement"></achievement-card>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['achievement.component.css'],
})
export class AchievementComponent {
  achievement: Achievement;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private achievementsService: AchievementsService
  ) {
    this.achievementsService.getAchievementDetails(
      this.route.snapshot.params['id']
    );
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

  removeAchievement() {
    console.log('Delete Achievement');
    this.achievementsService.deleteAchievement(this.achievement._id);
    this.router.navigateByUrl('/achievements');
  }
}
