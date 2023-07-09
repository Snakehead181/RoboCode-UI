import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ADMIN_ACHIEVEMENTS_ROUTE } from './admin-achievements.routes';
import { AchievementsComponent } from './acheivements.component';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementCardComponent } from './achievement-card/achievement-card.component';
import { CreateAchievementsComponent } from './create-achievements/create-achievements.component';
import { EditAchievementComponent } from './edit-achievement/edit-achievement.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild(ADMIN_ACHIEVEMENTS_ROUTE),
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    AchievementsComponent,
    AchievementComponent,
    AchievementCardComponent,
    CreateAchievementsComponent,
    EditAchievementComponent,
  ],
  providers: [],
})
export class AdminAchievementsModule {}
