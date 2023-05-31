import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'home',
  template: `<div class="card mt-4">
    <h4 class="card-header">
      You're logged in with Angular 14 & Basic HTTP Authentication!!
    </h4>
    <div class="card-body">
      <h6>Users from secure api end point</h6>
      <div *ngIf="loading" class="spinner-border spinner-border-sm"></div>
      <ul *ngIf="users">
        <li *ngFor="let user of users">
          {{ user.firstName }} {{ user.lastName }}
        </li>
      </ul>
    </div>
  </div>`,
})
export class HomeComponent {
  loading = false;
  users?: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }
}
