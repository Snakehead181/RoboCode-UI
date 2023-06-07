import { Component, OnInit } from '@angular/core';
import { Teams } from '../models/teams';
import { Router } from '@angular/router';
import { TeamService } from '../services';
import { allTeams } from '../state/teams/teams.selector';
import { Store, select } from '@ngrx/store';

@Component({
  template: `<div class="container">
    <h1 class="title">Robocode Leaderboard</h1>
    <div *ngIf="teams$ | async as data">
      <div id="profile">
        <div class="flex" *ngFor="let team of data">
          <div class="item">
            <tank tankColor="{{ team.color }}"></tank>
            <div class="info">
              <div class="name">{{ team.name }}</div>
              <span class="team-number">Team {{ team.number }}</span>
            </div>
          </div>
          <div class="item">
            <span>{{ team.score }}</span>
          </div>
        </div>
      </div>
    </div>
  </div> `,
  styleUrls: ['leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  teams$ = this.store.pipe(select(allTeams));

  constructor(
    private router: Router,
    private teamService: TeamService,
    private store: Store
  ) {
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
