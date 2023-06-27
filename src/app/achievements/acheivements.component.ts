import { Component, OnInit } from '@angular/core';
import { MentorService } from '../services/mentor.service';
import { Store } from '@ngrx/store';
import { allMentors } from '../state/mentors/mentors.selector';
import { map } from 'rxjs';

@Component({
  selector: 'achievements',
  template: `<div class="card mt-4">
    <h4 class="card-header">Achievements</h4>
    <div class="card-body">
      <achievement-card></achievement-card>
    </div>
  </div>`,
})
export class AchievementsComponent {
  mentorsState$ = this.store.select((s: any) => s.mentor);
  mentors$ = this.store.select(allMentors);
  loading$ = this.mentorsState$.pipe(map((x: any) => x.loading));

  constructor(private mentorService: MentorService, private store: Store) {}

  ngOnInit() {
    this.updateMentors();
  }

  updateMentors() {
    this.mentorService.getMentors();
  }
}
