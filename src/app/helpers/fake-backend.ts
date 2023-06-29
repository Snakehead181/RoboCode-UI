import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Mentor, User } from '../models';
import { MentorService } from '../services';
import { Store } from '@ngrx/store';

const admins: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'Admin-2023',
    firstName: 'Admin',
    lastName: '2023',
    role: 'ADMIN',
  },
  {
    id: 2,
    username: 'mentor',
    password: 'Mentor-2023',
    firstName: 'Mentor',
    lastName: '2023',
    role: 'MENTOR',
  },
];

// const mentors: Mentor[] = ;

export const TankColors = ['Blue', 'Red', 'Pink', 'Orange', 'Grey'];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private mentorService: MentorService, private store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = admins.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        username: user.username,
        name: user.firstName,
        role: user.role,
      });
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(admins);
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message: string) {
      return throwError(() => ({ error: { message } }));
    }

    function unauthorized() {
      return throwError(() => ({
        status: 401,
        error: { message: 'Unauthorized' },
      }));
    }

    function isLoggedIn() {
      return (
        headers.get('Authorization') ===
        `Basic ${window.btoa('admin:Admin-2023')}`
      );
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
