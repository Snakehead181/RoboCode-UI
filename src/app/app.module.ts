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
import { StoreModule } from '@ngrx/store';
import { AchievementsService, MentorService, TeamService } from './services';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { rootReducer } from './state/root.reducer';
import { TeamsModule } from './teams/teams.module';
import { GlobalComponentModule } from './global/components/global-components.module';
import { MentorsModule } from './mentors/mentors.module';
import { AchievementsModule } from './achievements/achievements.module';
import { ToastModule } from './global/toast/toast.module';
import { MentorTeamService } from './services/mentor-team.service';
import { TeamAchievementsModule } from './achievements/team-achievements/team-achievements.module';
import { ClockComponent } from './leaderboard/timer/clock.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    CommonModule,
    TeamsModule,
    GlobalComponentModule,
    MentorsModule,
    AchievementsModule,
    TeamAchievementsModule,
    ToastModule,
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LeaderboardComponent,
    ClockComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService,
    MentorService,
    TeamService,
    MentorTeamService,
    AchievementsService,
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
