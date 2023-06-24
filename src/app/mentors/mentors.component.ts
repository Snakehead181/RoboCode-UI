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
    <h4 class="card-header">Mentors</h4>
    <div class="card-body">
      <div class="row">
        <div class="column">
          <h6>Mentors Registered</h6>
          <div
            *ngIf="loading$ | async"
            class="spinner-border spinner-border-sm"
          ></div>
          <ul *ngIf="mentors$ | async as Data">
            <li *ngFor="let mentor of Data">
              {{ mentor.name }}
            </li>
            <li *ngIf="Data.length === 0 && !(loading$ | async)">
              No Mentors Registered
            </li>
          </ul>
        </div>
        <div class="column">
          <register-mentor></register-mentor>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['mentors.component.css'],
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
