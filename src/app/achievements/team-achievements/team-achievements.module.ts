import { NgModule } from '@angular/core';
import { TeamAchievementsComponent } from './team-achievements.component';
import { TeamAchievementCardComponent } from './team-achievement-card/team-achievement-card.component';
import { RouterModule } from '@angular/router';
import { TEAM_ACHIEVEMENTS_ROUTE } from './team-achievements.routes';
import { CommonModule } from '@angular/common';
import { TeamAchievementComponent } from './team-achievement/team-achievement.component';
import { AchievementsService } from 'src/app/services';

@NgModule({
  imports: [RouterModule.forChild(TEAM_ACHIEVEMENTS_ROUTE), CommonModule],
  exports: [TeamAchievementCardComponent],
  declarations: [
    TeamAchievementCardComponent,
    TeamAchievementComponent,
    TeamAchievementsComponent,
  ],
  providers: [TeamAchievementsComponent],
})
export class TeamAchievementsModule {}
