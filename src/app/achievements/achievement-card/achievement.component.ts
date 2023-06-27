import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models';

@Component({
  selector: 'achievement-card',
  template: ` <div class="card">
    <div class="card-body">
      <div class="top-part">
        <i class="bi bi-exclamation-circle"></i>
        <h5 class="card-title">{{ achievement.name }}</h5>
      </div>
      <p class="card-text centered">
        {{ achievement.description }}
      </p>
    </div>
  </div>`,
  styleUrls: ['achievement.component.css'],
})
export class AchievementCardComponent implements OnInit {
  @Input()
  achievement: Achievement;

  constructor() {}

  ngOnInit() {}
}
