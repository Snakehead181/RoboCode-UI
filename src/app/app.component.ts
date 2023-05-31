import { Component, OnInit } from '@angular/core';
import { User } from './models';
import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  template: `<html>
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3" *ngIf="user">
      <div class="navbar-nav">
        <a
          class="nav-item nav-link"
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          >Home</a
        >
        <a
          class="nav-item nav-link"
          routerLink="/leaderboard"
          routerLinkActive="active"
          >Leaderboard</a
        >
        <button class="btn btn-link nav-item nav-link" (click)="logout()">
          Logout
        </button>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </html>`,
})
export class AppComponent {
  user?: User | null;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.authenticationService.logout();
  }
}
