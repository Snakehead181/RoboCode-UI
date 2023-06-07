import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  constructor() {}

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
}
