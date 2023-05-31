import { Component, OnInit } from '@angular/core';
import { Teams } from '../models/teams';
import { Router } from '@angular/router';

@Component({
  template: `<div class="container">
    <h1 class="title">Robocode Leaderboard</h1>
    <div id="profile">
      <div class="flex" *ngFor="let team of sort(teams)">
        <div class="item">
          <tank tankColor="{{ team.color }}"></tank>
          <div class="info">
            <div class="name">{{ team.teamName }}</div>
            <span class="team-number">Team {{ team.teamNumber }}</span>
          </div>
        </div>
        <div class="item">
          <span>{{ team.score }}</span>
        </div>
      </div>
    </div>
  </div> `,
  styleUrls: ['leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  teams = Teams;
  constructor(private router: Router) {}

  ngOnInit() {}

  sort(teams: any) {
    let sortedTeams = teams.sort((a: any, b: any) => {
      return parseFloat(b.score) - parseFloat(a.score);
    });
    return sortedTeams;
  }
}
