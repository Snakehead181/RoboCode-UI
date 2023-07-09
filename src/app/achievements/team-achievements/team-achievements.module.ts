import { NgModule } from '@angular/core';
import { TeamAchievementsComponent } from './team-acheivements.component';
import { TeamAchievementCardComponent } from './team-achievement-card/team-achievement-card.component';
import { RouterModule } from '@angular/router';
import { TEAM_ACHIEVEMENTS_ROUTE } from './team-achievements.routes';
import { CommonModule } from '@angular/common';
import { TeamAchievementComponent } from './team-achievement/team-achievement.component';

@NgModule({
  imports: [RouterModule.forChild(TEAM_ACHIEVEMENTS_ROUTE), CommonModule],
  exports: [],
  declarations: [
    TeamAchievementsComponent,
    TeamAchievementCardComponent,
    TeamAchievementComponent,
  ],
  providers: [],
})
export class TeamAchievementsModule {}
