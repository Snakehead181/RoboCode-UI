import { NgModule } from '@angular/core';

import { AchievementsComponent } from './acheivements.component';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementCardComponent } from './achievement-card/achievement.component';
import { ACHIEVEMENTS_ROUTES } from './achievements.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementsService } from '../services';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ACHIEVEMENTS_ROUTES)],
  exports: [],
  declarations: [
    AchievementsComponent,
    AchievementComponent,
    AchievementCardComponent,
  ],
  providers: [AchievementsService],
})
export class AcheivementsModule {}
