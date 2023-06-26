import { NgModule } from '@angular/core';

import { TeamsComponent } from './teams.component';
import { RegisterTeamComponent } from './register-team/register-team.component';
import { TeamService } from '../services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TEAMS_ROUTES } from './teams.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamComponent } from './team/team.component';
import { GlobalComponentModule } from '../global/components/global-components.module';
import { EditTeamComponent } from './edit-team/edit-team.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TEAMS_ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    GlobalComponentModule,
  ],
  exports: [],
  declarations: [
    TeamsComponent,
    TeamComponent,
    RegisterTeamComponent,
    EditTeamComponent,
  ],
  providers: [TeamService],
})
export class TeamsModule {}
