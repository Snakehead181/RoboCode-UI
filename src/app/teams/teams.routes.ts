import { Route } from '@angular/router';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams.component';

export const TEAMS_ROUTES: Route[] = [
  { path: '', component: TeamsComponent },
  { path: ':id', component: TeamComponent },
  { path: ':id/edit', component: EditTeamComponent },
];
