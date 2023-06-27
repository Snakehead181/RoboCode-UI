import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models';

@Component({
  selector: 'achievement-card',
  template: `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`,
})
export class AchievementCardComponent implements OnInit {
  @Input()
  achievement: Achievement;

  constructor() {}

  ngOnInit() {}
}
