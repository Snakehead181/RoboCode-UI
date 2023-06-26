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
import { MentorService } from './services';
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

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    CommonModule,
    TeamsModule,
    GlobalComponentModule,
    MentorsModule,
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
    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
