import { Route } from '@angular/router';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementsComponent } from './achievements.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';
import { MentorComponent } from 'src/app/mentors/mentor/mentor.component';
import { AdminGuard } from 'src/app/helpers/admin.guard';

export const ADMIN_ACHIEVEMENTS_ROUTE: Route[] = [
  { path: '', component: AchievementsComponent, canActivate: [AdminGuard] },
  {
    path: ':id/view',
    component: AchievementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: ':id/edit',
    component: EditAchievementComponent,
    canActivate: [AdminGuard],
  },
];
