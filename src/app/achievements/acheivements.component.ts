import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { allAchievements } from '../state/achievements/achivements.selector';
import { AchievementsService } from '../services';

@Component({
  selector: 'achievements',
  template: ` <div class="card">
    <h4 class="card-header">Achievements</h4>

    <div *ngIf="achievements$ | async as Achievements">
      <div class="row card-group">
        <achievement-card
          class="col-3"
          *ngFor="let achievement of Achievements"
          [achievement]="achievement"
        ></achievement-card>
      </div>
    </div>
  </div>`,
})
export class AchievementsComponent {
  achievementsState$ = this.store.select((s: any) => s.achievement);
  achievements$ = this.store.select(allAchievements);
  loading$ = this.achievementsState$.pipe(map((x: any) => x.loading));

  constructor(
    private achievementsService: AchievementsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.getAchievements();
  }

  getAchievements() {
    this.achievementsService.getAchievements();
  }
}
