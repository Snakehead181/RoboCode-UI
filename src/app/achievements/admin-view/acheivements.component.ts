import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { allAchievements } from '../../state/achievements/achivements.selector';
import { AchievementsService, AuthenticationService } from '../../services';

@Component({
  selector: 'achievements',
  template: `<div class="card">
    <div class="card-header">
      <h4>Achievements</h4>
      <button
        type="button"
        class="btn btn-primary"
        [routerLink]="['create']"
        *ngIf="checkRole('ADMIN')"
      >
        Create Achievement
      </button>
    </div>
    <div class="d-flex justify-content-center" *ngIf="loading$ | async">
      <div class="spinner-border" style="margin: 15px;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
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
  styleUrls: ['achievements.component.css'],
})
export class AchievementsComponent {
  achievementsState$ = this.store.select((s: any) => s.achievement);
  achievements$ = this.store.select(allAchievements);
  loading$ = this.achievementsState$.pipe(map((x: any) => x.loading));

  constructor(
    private achievementsService: AchievementsService,
    private authService: AuthenticationService,
    private store: Store
  ) {}

  ngOnInit() {
    this.getAchievements();
  }

  getAchievements() {
    this.achievementsService.getAchievements();
  }

  checkRole(role) {
    this.authService.checkRole(role);
  }
}
