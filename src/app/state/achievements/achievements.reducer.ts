import { Achievement } from 'src/app/models';
import { createReducer, on } from '@ngrx/store';
import {
  AchievementLoaded,
  AchievementsLoaded,
  LoadAchievements,
} from './achievements.actions';

export interface AchievementState {
  loading: boolean;
  achievements: Achievement[];
}

export const initialAchievementState: AchievementState = {
  loading: false,
  achievements: [],
};

export const achievementReducer = createReducer(
  initialAchievementState,
  on(LoadAchievements, (oldState: AchievementState) => {
    return {
      ...oldState,
      loading: true,
      achievements: [],
    };
  }),
  on(AchievementsLoaded, (oldState: AchievementState, { data }) => {
    return {
      ...oldState,
      loading: false,
      achievements: data,
    };
  }),
  on(AchievementLoaded, (oldState: AchievementState, { data }) => {
    return {
      ...oldState,
      achievements: [
        ...oldState.achievements.filter((a) => a._id !== data._id),
        data,
      ],
    };
  })
);
