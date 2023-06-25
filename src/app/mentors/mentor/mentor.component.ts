import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { Mentor } from 'src/app/models';
import { mentorById } from 'src/app/state/mentors/mentors.selector';

@Component({
  selector: 'mentor',
  template: `<div class="card mt-4">
    <ng-container *ngIf="mentor$ | async as mentor">
      <div class="top-bar">
        <h4 class="card-header">{{ mentor.name }}</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="column">
            <ul class="list-group">
              <li class="list-group-item">
                <div>Name:</div>
                <div>{{ mentor.name }}</div>
              </li>
              <li class="list-group-item">
                <div>Username:</div>
                <div>{{ mentor.username }}</div>
              </li>
              <li class="list-group-item">
                <div>Assigned Team:</div>
                <div>{{ mentor.assignedTeam }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['mentor.component.css'],
})
export class MentorComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute) {}

  mentor$ = this.route.params.pipe(
    switchMap((p) =>
      this.store.pipe(
        select(mentorById, p['id']),
        map((mentor) => {
          if (p['id'] && !mentor) {
            return null;
          }
          return mentor ?? ({} as Mentor);
        })
      )
    )
  );

  ngOnInit() {}
}
