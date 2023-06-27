import { createSelector, select } from '@ngrx/store';
import { AchievementState } from './achievements.reducer';

export const selectAchievementState = (state) => state.achievement;

export const allAchievements = createSelector(
  selectAchievementState,
  (state: AchievementState) => {
    console.log(state);
    return state.achievements;
  }
);
