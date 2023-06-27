import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AchievementService {
  constructor(private httpClient: HttpClient) {}

  getAchievements() {
    console.log('Get Achievements');
    this.httpClient.get('http://localhost:3000/achievements');
  }
}
