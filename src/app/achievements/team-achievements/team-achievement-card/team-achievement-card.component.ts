import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ToastService } from 'src/app/global/toast/toast.service';
import { Achievement } from 'src/app/models';
import { AuthenticationService, TeamService } from 'src/app/services';
import { TeamAchievementsComponent } from '../team-achievements.component';

@Component({
  selector: 'team-achievement-card',
  template: ` <div
    class="card"
    [ngClass]="achievement.completed ? 'completed' : 'not-completed'"
  >
    <div class="card-body">
      <div class="top-part centered">
        <i
          *ngIf="achievement.requiresVerification"
          title="Requires Verification"
          class="bi bi-exclamation-circle"
        ></i>
        <h5 class="card-title">{{ achievement.name }}</h5>

        <i
          [ngClass]="isOnViewPage ? '' : 'bi bi-gear'"
          [routerLink]="achievement._id + '/view'"
        ></i>
      </div>
      <p class="card-text centered desc">
        {{ achievement.description }}
      </p>
      <p class="card-text centered" style="font-size: 15px">
        {{ achievement.points }} Points
      </p>
      <div class="bottom-part centered" *ngIf="!isOnViewPage">
        <i
          [ngClass]="!achievement.completed ? '' : 'bi bi-x-circle'"
          (click)="achievementNotCompleted()"
        ></i>
        <p
          class="card-text centered"
          style="font-style: italic; font-size: 12px"
        >
          {{ achievement.achievementType }}
        </p>
        <i
          [ngClass]="achievement.completed ? '' : 'bi bi-check-circle'"
          (click)="achievementCompleted()"
        ></i>
      </div>
    </div>
  </div>`,
  styleUrls: ['team-achievement-card.component.css'],
})
export class TeamAchievementCardComponent {
  @Input()
  achievement: Achievement;

  @Input()
  teamId: string;

  achievementCompletion: boolean;
  isOnViewPage: boolean;
  teamScore: number;

  constructor(
    private teamService: TeamService,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private teamAchievementsComp: TeamAchievementsComponent
  ) {
    this.isOnViewPage = window.location.pathname.endsWith('view');
    console.log(this.isOnViewPage);
  }

  achievementNotCompleted() {
    this.achievementCompletion = false;
    this.updateAchievementCompletion();
  }

  getTeamScore() {
    return this.teamAchievementsComp.getTeamScore();
  }

  achievementCompleted() {
    this.achievementCompletion = true;
    this.updateAchievementCompletion();
  }

  updateAchievementCompletion() {
    this.teamScore = this.getTeamScore();
    if (this.achievementCompletion === true) {
      this.teamScore += this.achievement.points;
    } else {
      this.teamScore -= this.achievement.points;
    }
    let result$ = this.teamService.updateTeamAchievements(
      this.achievement._id,
      this.teamId,
      this.achievementCompletion,
      this.teamScore
    );
    result$
      .pipe(
        catchError((err) => {
          return of({
            errorMessage: 'Could not change achievement state',
            err,
          });
        })
      )
      .subscribe((result: any) => {
        if (result.errorMessage) {
          this.toastService.danger({
            text: 'Failed to update achievement',
          });
        } else {
          this.toastService.success({
            text: 'Achievment Updated',
          });
          this.teamAchievementsComp.updateTeam();
          this.getTeamScore();
        }
      });
  }
}
