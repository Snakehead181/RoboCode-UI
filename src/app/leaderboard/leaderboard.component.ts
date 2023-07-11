import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services';
import { allTeams } from '../state/teams/teams.selector';
import { Store, select } from '@ngrx/store';
import { TeamState } from '../state/teams/teams.reducer';
import { map } from 'rxjs';

@Component({
  template: `<div class="container">
    <clock *ngIf="!(loading$ | async)"></clock>
    <h1 class="title">Robocode Leaderboard</h1>
    <div class="d-flex justify-content-center" *ngIf="loading$ | async">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div *ngIf="teams$ | async as data">
      <team-display [data]="data"></team-display>
    </div>
  </div> `,
  styleUrls: ['leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  teamState$ = this.store.select((s: any) => s.team);
  teams$ = this.store.pipe(select(allTeams));
  loading$ = this.teamState$.pipe(map((x: TeamState) => x.loading));

  constructor(private teamService: TeamService, private store: Store) {
    this.updateTeams();
  }

  ngOnInit() {}

  sort(teams: any) {
    let sortedTeams = teams.sort((a: any, b: any) => {
      return parseFloat(b.score) - parseFloat(a.score);
    });
    return sortedTeams;
  }

  updateTeams() {
    this.teamService.getTeams();
  }
}
