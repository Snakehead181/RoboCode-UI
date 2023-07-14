import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AchievementLoaded,
  AchievementsLoaded,
  LoadAchievements,
} from '../state/achievements/achievements.actions';
import { Achievement, Team } from '../models';

@Injectable()
export class AchievementsService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  getAchievements() {
    this.store.dispatch(LoadAchievements());
    this.httpClient
      .get('https://robocode-392510.appspot.com/achievements')
      .subscribe((res: any) => {
        console.log('Get Achievements Response', { res });
        this.store.dispatch(AchievementsLoaded({ data: res }));
      });
  }

  addAchievement(achievement) {
    return this.httpClient.post(
      'https://robocode-392510.appspot.com/achievements',
      achievement
    );
  }

  getAchievementDetails(achievementId: string) {
    this.httpClient
      .get('https://robocode-392510.appspot.com/achievements/' + achievementId)
      .subscribe((a) => {
        this.store.dispatch(AchievementLoaded({ data: a as Achievement }));
      });
  }

  updateAchievement(achievement: Achievement) {
    return this.httpClient.put(
      'https://robocode-392510.appspot.com/achievements/' + achievement._id,
      achievement
    );
  }

  deleteAchievement(achievementId: string) {
    return this.httpClient
      .delete(
        'https://robocode-392510.appspot.com/achievements/' + achievementId
      )
      .subscribe(() => console.log('Achievement Deleted'));
  }

  achievementCompleted(achievementId: string, team: Team) {
    return this.httpClient
      .put(
        'https://robocode-392510.appspot.com/teamAchievements/' + achievementId,
        team
      )
      .subscribe(() => console.log('Achievement Marked as Completed'));
  }
}
