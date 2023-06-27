import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { MentorService, TeamService } from '../services';
import { Store } from '@ngrx/store';
import { allMentors } from '../state/mentors/mentors.selector';
import { allTeams } from '../state/teams/teams.selector';

@Component({
  selector: 'home',
  template: `<div class="card mt-4">
    <h4 class="card-header">Welcome to RoboRumble 2023</h4>
    <div class="card-body">
      <div class="row">
        <div class="column">
          <h6>Teams</h6>
          <div
            *ngIf="loadingTeams$ | async"
            class="spinner-border spinner-border-sm"
          ></div>
          <ul *ngIf="teams$ | async as teams">
            <li *ngFor="let team of teams">
              <a [routerLink]="'teams/' + team._id">{{ team.name }}</a>
            </li>
          </ul>
        </div>
        <div class="column">
          <h6>Mentors</h6>
          <div
            *ngIf="loadingMentors$ | async"
            class="spinner-border spinner-border-sm"
          ></div>
          <ul *ngIf="mentors$ | async as mentors">
            <li *ngFor="let mentor of mentors">
              <a [routerLink]="'mentors/' + mentor._id">{{ mentor.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  loading = false;
  users?: User[];

  teamsState$ = this.store.select((s: any) => s.team);
  mentorsState$ = this.store.select((s: any) => s.mentor);
  mentors$ = this.store.select(allMentors);
  teams$ = this.store.select(allTeams);

  loadingTeams$ = this.teamsState$.pipe(map((x: any) => x.loading));
  loadingMentors$ = this.mentorsState$.pipe(map((x: any) => x.loading));

  constructor(
    private store: Store,
    private teamService: TeamService,
    private mentorService: MentorService
  ) {}

  ngOnInit() {
    this.updateMentors();
    this.updateTeams();
  }

  updateTeams() {
    this.teamService.getTeams();
  }

  updateMentors() {
    this.mentorService.getMentors();
  }
}
