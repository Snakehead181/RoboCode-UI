import { Component, OnInit } from '@angular/core';
import { User } from './models';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  template: `<html>
    <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark px-3">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-exapanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i class="bi bi-list" style="color:#00ff41; font-size:28px;"></i>
          </span>
        </button>
        <a class="navbar-brand" routerLink="/">RoboRumble</a>
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
          *ngIf="user"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link"
                aria-current="page"
                routerLink="/"
                routerLinkActive="active"
                >Home</a
              >
            </li>
            <li>
              <a
                class="nav-link"
                routerLink="/mentors"
                routerLinkActive="active"
                *ngIf="role('ADMIN')"
                >Mentors</a
              >
            </li>
            <li>
              <a class="nav-link" routerLink="/teams" routerLinkActive="active"
                >Teams</a
              >
            </li>
            <li>
              <a
                class="nav-link"
                routerLink="/leaderboard"
                routerLinkActive="active"
                >Leaderboard</a
              >
            </li>
            <li>
              <a
                class="nav-link"
                [routerLink]="'/achievements/' + getTeamId()"
                routerLinkActive="active"
                *ngIf="role('MENTOR')"
                >Team Achievements</a
              >
            </li>
            <li>
              <a
                class="nav-link"
                routerLink="/achievements"
                routerLinkActive="active"
                *ngIf="role('ADMIN')"
                >Achievements</a
              >
            </li>
            <li>
              <a class="nav-link" (click)="logout()"> Logout </a>
            </li>
          </ul>

          <!--
        <a
          class="nav-item nav-link"
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        >
        <a
          class="nav-item nav-link"
          routerLink="/mentors"
          routerLinkActive="active"
          *ngIf="role('ADMIN')"
          >Mentors</a
        >
        <a
          class="nav-item nav-link"
          routerLink="/teams"
          routerLinkActive="active"
          >Teams</a
        >
        <a
          class="nav-item nav-link"
          routerLink="/leaderboard"
          routerLinkActive="active"
          >Leaderboard</a
        >
        <a
          class="nav-item nav-link"
          [routerLink]="'/achievements/' + getTeamId()"
          routerLinkActive="active"
          *ngIf="role('MENTOR')"
          >Team Achievements</a
        >
        <a
          class="nav-item nav-link"
          routerLink="/achievements"
          routerLinkActive="active"
          *ngIf="role('ADMIN')"
          >Achievements</a
        >
        <a class="nav-item nav-link" (click)="logout()"> Logout </a> -->
        </div>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <toast-container aria-live="polite" aria-atomic="true"></toast-container>
  </html>`,
  styles: [
    `
      nav {
        background-color: black !important;
      }

      .nav-item:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class AppComponent {
  user?: User | null;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.authenticationService.logout();
  }

  role(role: string) {
    return this.authenticationService.checkRole(role);
  }

  getTeamId() {
    return this.authenticationService.getCurrentUserObject().assignedTeam._id;
  }
}
