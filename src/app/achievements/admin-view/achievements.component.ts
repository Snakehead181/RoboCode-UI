import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { allAchievements } from '../../state/achievements/achivements.selector';
import {
  AchievementsService,
  AuthenticationService,
  TeamService,
} from '../../services';
import { Team } from 'src/app/models';
import { allTeams, teamById } from 'src/app/state/teams/teams.selector';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'achievements',
  template: `<div class="card">
    <div class="card-header">
      <h4>Achievements</h4>
      <select
        id="achievementType"
        class="form-select"
        (change)="changeAchievementView($event)"
      >
        <option [ngValue]="">Admin</option>
        <option *ngFor="let team of teams$ | async" [value]="team._id">
          {{ team.name }}
        </option>
      </select>
      <button type="button" class="btn btn-primary" [routerLink]="['create']">
        Create Achievement
      </button>
    </div>
    <div class="d-flex justify-content-center" *ngIf="loading$ | async">
      <div class="spinner-border" style="margin: 15px;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div *ngIf="achievements$ | async as Achievements">
      <div class="row card-group" *ngIf="!impersonating">
        <achievement-card
          class="col-12 col-lg-3 col-md-6"
          *ngFor="let achievement of Achievements"
          [achievement]="achievement"
        ></achievement-card>
      </div>
    </div>
    <div class="row card-group" *ngIf="impersonating && team.achievements">
      <team-achievement-card
        *ngFor="let achievement of team.achievements"
        [achievement]="achievement"
        [teamId]="team._id"
      ></team-achievement-card>
    </div>
  </div>`,
  styleUrls: ['achievements.component.css'],
})
export class AchievementsComponent {
  achievementsState$ = this.store.select((s: any) => s.achievement);
  achievements$ = this.store.select(allAchievements);
  loading$ = this.achievementsState$.pipe(map((x: any) => x.loading));
  teams$ = this.store.select(allTeams);

  team$: Observable<Team | null>;
  team: Team;
  impersonating: boolean = false;

  constructor(
    private achievementsService: AchievementsService,
    private authService: AuthenticationService,
    private teamService: TeamService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAchievements();
    this.getTeams();
  }

  getAchievements() {
    this.achievementsService.getAchievements();
  }

  getTeams() {
    this.teamService.getTeams();
  }

  checkRole(role) {
    this.authService.checkRole(role);
  }

  changeAchievementView(e) {
    let teamId = e.target.value;
    this.impersonating = true;
    console.log(e.target.value);

    this.router.navigate(['achievements/' + teamId]);

    this.team$ = this.route.params.pipe(
      switchMap((p) =>
        this.store.pipe(
          select(teamById, teamId),
          map((team) => {
            console.log(team);
            if (teamId && !team) {
              return null;
            }
            this.team = team!;
            return team ?? ({} as Team);
          })
        )
      )
    );
  }
}
