import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models';
import { AchievementsService, AuthenticationService } from 'src/app/services';

@Component({
  selector: 'team-achievement-card',
  template: ` <div class="card">
    <div class="card-body">
      <div class="top-part centered">
        <i
          *ngIf="achievement.requiresVerification"
          class="bi bi-exclamation-circle"
          title="Requires Verification"
        ></i>
        <h5 class="card-title">{{ achievement.name }}</h5>
        <i class="bi bi-gear" [routerLink]="achievement._id + '/view'"></i>
      </div>
      <p class="card-text centered desc">
        {{ achievement.description }}
      </p>
      <p class="card-text centered" style="font-size: 15px">
        {{ achievement.points }} Points
      </p>
      <div class="bottom-part centered">
        <i class="bi bi-x-circle" (click)="achievementNotCompleted()"></i>
        <p
          class="card-text centered"
          style="font-style: italic; font-size: 12px"
        >
          {{ achievement.achievementType }}
        </p>
        <i class="bi bi-check-circle" (click)="achievementCompleted()"></i>
      </div>
    </div>
  </div>`,
  styleUrls: ['team-achievement-card.component.css'],
})
export class TeamAchievementCardComponent {
  @Input()
  achievement: Achievement;

  constructor(
    private achievementsService: AchievementsService,
    private authService: AuthenticationService
  ) {}

  achievementNotCompleted() {
    console.log(this.achievement.name);
  }

  achievementCompleted() {
    this.achievementsService.achievementCompleted(
      this.achievement._id,
      this.authService.getCurrentUserObject()?.team?._id
    );
  }
}
