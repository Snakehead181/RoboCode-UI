import { Route } from '@angular/router';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams.component';
import { AdminGuard } from '../helpers/admin.guard';
import { MentorGuard } from '../helpers/mentor.guard';

export const TEAMS_ROUTES: Route[] = [
  { path: '', component: TeamsComponent, canActivate: [MentorGuard] },
  { path: ':id', component: TeamComponent, canActivate: [MentorGuard] },
  { path: ':id/edit', component: EditTeamComponent, canActivate: [AdminGuard] },
];
