import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { switchMap, map, Subscription } from 'rxjs';
import { Team } from 'src/app/models';
import {
  AuthenticationService,
  MentorService,
  TeamService,
} from 'src/app/services';
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
                <div>Score:</div>
                <div>{{ team.score }}</div>
              </li>
              <li class="list-group-item">
                <div>Assigned Mentor:</div>
                <div>
                  {{ team.assignedMentor.name }}
                </div>
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
})
export class TeamComponent {
  mentorState$ = this.store.select((s: any) => s.mentor);
  assignedMentorName$: Subscription;
  loading$ = this.mentorState$.pipe(map((x: any) => x.loading));

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
    this.mentorService.getMentors();
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

  async removeTeam() {
    console.log('Delete Team');
    console.log(this.team._id);
    this.teamService.removeTeam(this.team._id);

    await this.router.navigateByUrl('/teams');
    window.location.reload();
  }
}
