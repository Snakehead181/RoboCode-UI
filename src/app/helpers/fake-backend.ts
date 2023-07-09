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
import {
  delay,
  mergeMap,
  materialize,
  dematerialize,
  switchMap,
} from 'rxjs/operators';

import { Mentor } from '../models';
import { AuthenticationService, MentorService } from '../services';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private mentorService: MentorService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    let handleRoute = () => {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    };

    // route functions

    let authenticate = () => {
      const { username, password } = body;

      return this.authService.checkMentorAuth(username, password).pipe(
        switchMap((user: Mentor) => {
          if (!user) {
            return error('Username or password is incorrect');
          }
          return ok({
            id: user._id,
            username: user.username,
            name: user.name,
            role: user.role,
            assignedTeam: user.assignedTeam,
          });
        })
      );
    };

    let getUsers = () => {
      if (!isLoggedIn()) return unauthorized();
      return ok(this.mentorService.getMentors());
    };

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

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
