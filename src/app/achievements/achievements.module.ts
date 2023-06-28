import { NgModule } from '@angular/core';

import { AchievementsComponent } from './acheivements.component';
import { AchievementCardComponent } from './achievement-card/achievement-card.component';
import { ACHIEVEMENTS_ROUTES } from './achievements.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementsService } from '../services';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAchievementsComponent } from './create-achievements/create-achievements.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievements.component';
import { AchievementComponent } from './achievement/achievement.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ACHIEVEMENTS_ROUTES),
  ],
  exports: [],
  declarations: [
    AchievementsComponent,
    AchievementComponent,
    AchievementCardComponent,
    CreateAchievementsComponent,
    EditAchievementComponent,
  ],
  providers: [AchievementsService],
})
export class AcheivementsModule {}
