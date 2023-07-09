import { Route } from '@angular/router';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementsComponent } from './acheivements.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';

export const ADMIN_ACHIEVEMENTS_ROUTE: Route[] = [
  { path: '', component: AchievementsComponent },
  { path: ':id/view', component: AchievementComponent },
  { path: ':id/edit', component: EditAchievementComponent },
];
