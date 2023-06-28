import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models';

@Component({
  selector: 'achievement-card',
  template: ` <div class="card">
    <div class="card-body">
      <div class="top-part centered">
        <i
          *ngIf="achievement.requiresVerification"
          class="bi bi-exclamation-circle"
          title="Requires Verification"
        ></i>
        <h5 class="card-title">{{ achievement.name }}</h5>
        <i
          class="bi bi-gear"
          title="Requires Verification"
          [routerLink]="achievement._id"
        ></i>
      </div>
      <p class="card-text centered desc">
        {{ achievement.description }}
      </p>
      <p class="card-text centered" style="font-size: 15px">
        {{ achievement.points }} Points
      </p>
      <p class="card-text centered" style="font-style: italic; font-size: 12px">
        {{ achievement.achievementType }}
      </p>
    </div>
  </div>`,
  styleUrls: ['achievement-card.component.css'],
})
export class AchievementCardComponent implements OnInit {
  @Input()
  achievement: Achievement;

  constructor() {}

  ngOnInit() {}
}
