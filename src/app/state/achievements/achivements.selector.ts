import { createSelector, select } from '@ngrx/store';
import { AchievementState } from './achievements.reducer';
import { Achievement } from 'src/app/models';

export const selectAchievementState = (state) => state.achievement;

export const allAchievements = createSelector(
  selectAchievementState,
  (state: AchievementState) => {
    console.log(state);
    return state.achievements;
  }
);

export const achievementById = createSelector(
  allAchievements,
  (achievements: Achievement[], id: string) =>
    achievements.find((achievement) => achievement._id === id)
);
