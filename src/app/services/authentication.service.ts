import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/enviroments/environment';
import { Mentor, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('ROLE', user.role);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('ROLE');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getRole() {
    return localStorage.getItem('ROLE');
  }

  checkRole(role: string) {
    if (this.getRole() === role) {
      return true;
    }
    return false;
  }

  getCurrentUserId() {
    let user = localStorage.getItem('user');
    let userObj = JSON.parse(user!);
    return userObj.id;
  }

  checkMentorAuth(
    username: string,
    password: string
  ): Observable<Mentor | any> {
    return this.http.post('http://localhost:3000/authentication', {
      username,
      password,
    });
  }
}
