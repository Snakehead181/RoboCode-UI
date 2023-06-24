import { Component, OnInit } from '@angular/core';
import { MentorService } from '../services/mentor.service';
import { Store } from '@ngrx/store';
import {
  allMentors,
  selectMentorState,
} from '../state/mentors/mentors.selector';
import { map } from 'rxjs';

@Component({
  selector: 'mentors',
  template: `<div class="card mt-4">
    <h4 class="card-header">Welcome to RoboCode 2023</h4>
    <div class="card-body">
      <h6>Mentors Registered</h6>
      <div
        *ngIf="loading$ | async"
        class="spinner-border spinner-border-sm"
      ></div>
      <ul *ngIf="mentors$ | async as Data">
        <li *ngFor="let mentor of Data">
          {{ mentor.name }}
        </li>
        <li *ngIf="Data.length === 0">No Mentors Registered</li>
      </ul>
    </div>
  </div>`,
})
export class MentorsComponent {
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
