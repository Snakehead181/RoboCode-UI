import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map, Subscription } from 'rxjs';
import { Mentor, Team } from 'src/app/models';
import {
  AuthenticationService,
  MentorService,
  TeamService,
} from 'src/app/services';
import { allMentors, mentorById } from 'src/app/state/mentors/mentors.selector';
import { teamById } from 'src/app/state/teams/teams.selector';

@Component({
  selector: 'team',
  template: `<div class="card mt-4">
    <ng-container *ngIf="team$ | async as team">
      <div class="card-header">
        <h4>{{ team.name }}</h4>
        <ng-container *ngIf="getRole() === 'ADMIN'">
          <button type="button" class="btn btn-primary" [routerLink]="['edit']">
            Edit Team
          </button>
          <button type="button" class="btn btn-primary" (click)="removeTeam()">
            Remove Team
          </button>
        </ng-container>
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
                <div>Table Number:</div>
                <div>{{ team.tableNumber }}</div>
              </li>
              <li class="list-group-item">
                <div>Color:</div>
                <div>{{ team.color }}</div>
              </li>
              <li class="list-group-item">
                <div>Assigned Mentor:</div>
                <!-- <div>{{ getMentorNameById() }}</div> -->
              </li>
            </ul>
          </div>
          <div class="column">
            <team-display [team]="team"></team-display>
          </div>
        </div>
      </div>
    </ng-container>
  </div>`,
  styleUrls: ['team.component.css'],
})
export class TeamComponent {
  allMentors$ = this.store.select(allMentors);
  assignedMentor: Subscription;
  mentorName: string;
  team: Team;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private mentorService: MentorService,
    private authService: AuthenticationService
  ) {
    this.teamService.getTeamDetails(this.route.snapshot.params['id']);
    this.mentorService.getMentorDetails(this.team.assignedMentorId);
  }

  team$ = this.route.params.pipe(
    switchMap((p) =>
      this.store.pipe(
        select(teamById, p['id']),
        map((team) => {
          if (p['id'] && !team) {
            return null;
          }
          this.team = team!;
          return team ?? ({} as Team);
        })
      )
    )
  );

  getRole(): string {
    return this.authService.getRole() || '';
  }

  removeTeam() {
    console.log('Delete Team');
    console.log(this.team._id);
    this.teamService.removeTeam(this.team._id);

    this.router.navigateByUrl('/teams');
  }

  // getMentorNameById(): string {
  //   mentor.subscribe((mentor) => {
  //     this.mentorName = mentor?.name!;
  //     return this.mentorName;
  //   });
  //   return this.mentorName;
  // }
}
