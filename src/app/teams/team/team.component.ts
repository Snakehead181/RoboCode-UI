import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { Team } from 'src/app/models';
import { teamById } from 'src/app/state/teams/teams.selector';

@Component({
  selector: 'team',
  template: `<div class="card mt-4">
    <ng-container *ngIf="team$ | async as team">
      <div class="top-bar">
        <h4 class="card-header">{{ team.name }}</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="column">
            <ul class="list-group">
              <li class="list-group-item">
                <div>Name:</div>
                <div>{{ team.name }}</div>
              </li>
              <li class="list-group-item">
                <div>Assigned Mentor:</div>
                <div>{{ team.assignedMentor }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['team.component.css'],
})
export class TeamComponent implements OnInit {
  constructor(private store: Store, private route: ActivatedRoute) {}

  team$ = this.route.params.pipe(
    switchMap((p) =>
      this.store.pipe(
        select(teamById, p['id']),
        map((team) => {
          if (p['id'] && !team) {
            return null;
          }
          return team ?? ({} as Team);
        })
      )
    )
  );

  ngOnInit() {}
}
