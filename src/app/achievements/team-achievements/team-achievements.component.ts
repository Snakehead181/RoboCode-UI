import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { AuthenticationService, TeamService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models';
import { teamById } from 'src/app/state/teams/teams.selector';

@Component({
  selector: 'team-achievements',
  template: `<div class="card">
    <div class="card-header">
      <h4>Team Achievements</h4>
    </div>
    <div class="d-flex justify-content-center" *ngIf="loading$ | async">
      <div class="spinner-border" style="margin: 15px;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div *ngIf="team$ | async">
      <div class="row card-group">
        <team-achievement-card
          class="col-12 col-lg-3 col-md-6"
          *ngFor="let achievement of team.achievements"
          [achievement]="achievement"
          [teamId]="team._id"
        ></team-achievement-card>
      </div>
    </div>
  </div>`,
  styleUrls: ['team-achievements.component.css'],
})
export class TeamAchievementsComponent {
  teamState$ = this.store.select((s: any) => s.team);
  loading$ = this.teamState$.pipe(map((x: any) => x.loading));
  team: Team;

  constructor(
    private teamService: TeamService,
    private authService: AuthenticationService,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.updateTeam();
  }

  team$ = this.route.params.pipe(
    switchMap((p) =>
      this.store.pipe(
        select(teamById, p['id']),
        map((team) => {
          console.log(team);
          if (p['id'] && !team) {
            return null;
          }
          this.team = team!;
          return team ?? ({} as Team);
        })
      )
    )
  );

  updateTeam() {
    this.teamService.getTeamDetails(this.route.snapshot.params['id']);
  }

  checkRole(role) {
    this.authService.checkRole(role);
  }

  getTeamScore() {
    return this.team.score;
  }
}
