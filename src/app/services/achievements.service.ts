import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AchievementsLoaded,
  LoadAchievements,
} from '../state/achievements/achievements.actions';

@Injectable()
export class AchievementService {
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
}
