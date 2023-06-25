import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { TeamService } from '../services';
import { allTeams } from '../state/teams/teams.selector';

@Component({
  selector: 'teams',
  template: `<div class="card mt-4">
    <h4 class="card-header">Teams</h4>
    <div class="card-body">
      <div class="row">
        <div class="column">
          <h6>Teams Registered</h6>
          <div
            *ngIf="loading$ | async"
            class="spinner-border spinner-border-sm"
          ></div>
          <ul *ngIf="teams$ | async as Data">
            <li *ngFor="let team of Data">
              <a [routerLink]="team._id">{{ team.name }}</a>
            </li>
            <li *ngIf="Data.length === 0 && !(loading$ | async)">
              No Teams Registered
            </li>
          </ul>
        </div>
        <div class="column">
          <register-team></register-team>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['teams.component.css'],
})
export class TeamsComponent {
  teamsState$ = this.store.select((s: any) => s.team);
  teams$ = this.store.select(allTeams);
  loading$ = this.teamsState$.pipe(map((x: any) => x.loading));

  constructor(private teamService: TeamService, private store: Store) {}

  ngOnInit() {
    this.updateMentors();
  }

  updateMentors() {
    this.teamService.getTeams();
  }
}
