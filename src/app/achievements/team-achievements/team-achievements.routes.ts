import { Route } from '@angular/router';
import { TeamAchievementsComponent } from './team-acheivements.component';
import { TeamAchievementComponent } from './team-achievement/team-achievement.component';

export const TEAM_ACHIEVEMENTS_ROUTE: Route[] = [
  { path: ':id', component: TeamAchievementsComponent },
  { path: ':id/:id/view', component: TeamAchievementComponent },
];
