import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './helpers';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mentors',
    loadChildren: () =>
      import('./mentors/mentors.module').then((m) => m.MentorsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'achievements',
    loadChildren: () =>
      import('./achievements/achievements.module').then(
        (m) => m.AcheivementsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./teams/teams.module').then((m) => m.TeamsModule),
    canActivate: [AuthGuard],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
