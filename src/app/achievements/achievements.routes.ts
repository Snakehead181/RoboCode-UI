import { Route } from '@angular/router';
import { AchievementsComponent } from './acheivements.component';
import { AchievementComponent } from './achievement/achievement.component';

export const ACHIEVEMENTS_ROUTES: Route[] = [
  { path: '', component: AchievementsComponent },
  { path: ':name', component: AchievementComponent },
];
