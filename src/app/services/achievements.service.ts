import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AchievementLoaded,
  AchievementsLoaded,
  LoadAchievements,
} from '../state/achievements/achievements.actions';
import { Achievement } from '../models';

@Injectable()
export class AchievementsService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  getAchievements() {
    console.log('Get Achievements');

    this.store.dispatch(LoadAchievements());
    this.httpClient
      .get('http://localhost:3000/achievements')
      .subscribe((res: any) => {
        console.log('Get Achievements Response', { res });
        this.store.dispatch(AchievementsLoaded({ data: res }));
      });
  }

  addAchievement(achievement) {
    console.log('Add Achievement');
    return this.httpClient.post(
      'http://localhost:3000/achievements',
      achievement
    );
  }

  getAchievementDetails(achievementId: string) {
    this.httpClient
      .get('http://localhost:3000/achievements/' + achievementId)
      .subscribe((a) => {
        console.log('getAchievement', { a });
        this.store.dispatch(AchievementLoaded({ data: a as Achievement }));
      });
  }

  updateAchievement(achievement: Achievement) {
    return this.httpClient.put(
      'http://localhost:3000/achievements/' + achievement._id,
      achievement
    );
  }

  deleteAchievement(achievementId: string) {
    return this.httpClient
      .delete('http://localhost:3000/achievements/' + achievementId)
      .subscribe(() => console.log('Achievement Deleted'));
  }

  achievementCompleted(achievementId: string, teamId: string) {
    return this.httpClient.post(
      'http://localhost:3000/achievements' + achievementId,
      teamId
    );
  }
}
