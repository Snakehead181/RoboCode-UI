import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BasicAuthInterceptor, ErrorInterceptor } from './helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TankComponent } from './leaderboard/tank.component';
import { StoreModule } from '@ngrx/store';
import { MentorService, TeamService } from './services';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { MentorsComponent } from './mentors/mentors.component';
import { rootReducer } from './state/root.reducer';
import { RegisterMentorComponent } from './mentors/register-mentor/register-mentor.component';
import { MentorComponent } from './mentors/mentor/mentor.component';
import { TeamsComponent } from './teams/teams.component';
import { RegisterTeamComponent } from './teams/register-team/register-team.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamPlacementComponent } from './leaderboard/team-placement.component';
import { EditTeamComponent } from './teams/edit-team/edit-team.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    CommonModule,
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LeaderboardComponent,
    TankComponent,
    MentorsComponent,
    RegisterMentorComponent,
    MentorComponent,
    TeamsComponent,
    TeamComponent,
    RegisterTeamComponent,
    TeamPlacementComponent,
    EditTeamComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TeamService,
    UserService,
    MentorService,
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
