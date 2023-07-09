import { NgModule } from '@angular/core';

import { ACHIEVEMENTS_ROUTES } from './achievements.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementsService } from '../services';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamAchievementsModule } from './team-achievements/team-achievements.module';
import { AdminAchievementsModule } from './admin-view/admin-achievements.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ACHIEVEMENTS_ROUTES),
    TeamAchievementsModule,
    AdminAchievementsModule,
  ],
  exports: [],
  declarations: [],
  providers: [AchievementsService],
})
export class AchievementsModule {}
