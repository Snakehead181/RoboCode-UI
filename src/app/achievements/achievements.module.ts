import { NgModule } from '@angular/core';

import { AchievementsComponent } from './acheivements.component';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementCardComponent } from './achievement-card/achievement.component';
import { ACHIEVEMENTS_ROUTES } from './achievements.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild(ACHIEVEMENTS_ROUTES)],
  exports: [],
  declarations: [
    AchievementsComponent,
    AchievementComponent,
    AchievementCardComponent,
  ],
  providers: [],
})
export class AcheivementsModule {}
