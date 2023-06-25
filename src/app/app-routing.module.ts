import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './helpers';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MentorsComponent } from './mentors/mentors.component';
import { MentorComponent } from './mentors/mentor/mentor.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'mentors', component: MentorsComponent },
  { path: 'mentors/:id', component: MentorComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:id', component: TeamComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
