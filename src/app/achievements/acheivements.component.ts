import { Component } from '@angular/core';
import { MentorService } from '../services/mentor.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { allAchievements } from '../state/achievements/achivements.selector';

@Component({
  selector: 'achievements',
  template: `<div class="card mt-4">
    <h4 class="card-header">Achievements</h4>
    <div class="card-body">
      <div *ngIf="achievements$ | async as Achievements">
        <div *ngFor="let achievement of Achievements">
          <achievement-card [achievement]="achievement"></achievement-card>
        </div>
      </div>
    </div>
  </div>`,
})
export class AchievementsComponent {
  achievementsState$ = this.store.select((s: any) => s.achievement);
  achievements$ = this.store.select(allAchievements);
  loading$ = this.achievementsState$.pipe(map((x: any) => x.loading));

  constructor(private mentorService: MentorService, private store: Store) {}

  ngOnInit() {
    this.updateMentors();
  }

  updateMentors() {
    this.mentorService.getMentors();
  }
}
