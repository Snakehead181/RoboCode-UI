import { Route } from '@angular/router';
import { AchievementsComponent } from './acheivements.component';
import { CreateAchievementsComponent } from './create-achievements/create-achievements.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievements.component';
import { AchievementComponent } from './achievement/achievement.component';

export const ACHIEVEMENTS_ROUTES: Route[] = [
  { path: '', component: AchievementsComponent },
  { path: 'create', component: CreateAchievementsComponent },
  { path: ':id', component: AchievementComponent },
  { path: ':id/edit', component: EditAchievementComponent },
];
