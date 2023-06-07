import { Injectable } from '@angular/core';
import { User } from '../models';
import { environment } from 'src/enviroments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`);
  }
}
