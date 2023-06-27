import { createSelector, select } from '@ngrx/store';
import { Achievement, Team } from 'src/app/models';
import { AchievementState } from './achievements.reducer';

export const selectAchievementState = (state) => state.achievement;

export const allAchievements = createSelector(
  selectAchievementState,
  (state: AchievementState) => {
    return state.achievements;
  }
);
