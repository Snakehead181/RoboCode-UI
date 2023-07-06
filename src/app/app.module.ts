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
import { MentorService, TeamService } from './services';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { MentorsComponent } from './mentors/mentors.component';
import { rootReducer } from './state/root.reducer';
import { RegisterMentorComponent } from './mentors/register-mentor/register-mentor.component';
import { MentorComponent } from './mentors/mentor/mentor.component';
import { EditTeamComponent } from './teams/edit-team/edit-team.component';
import { TeamsModule } from './teams/teams.module';
import { GlobalComponentModule } from './global/components/global-components.module';
import { MentorsModule } from './mentors/mentors.module';
import { AcheivementsModule } from './achievements/achievements.module';
import { ToastModule } from './global/toast/toast.module';
import { MentorTeamService } from './services/mentor-team.service';

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
    AcheivementsModule,
    ToastModule,
  ],

  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LeaderboardComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService,
    MentorService,
    TeamService,
    MentorTeamService,
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
