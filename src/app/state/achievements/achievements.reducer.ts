import { Achievement, Team } from 'src/app/models';
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

export const initialTeamState: AchievementState = {
  loading: false,
  achievements: [],
};

export const teamReducer = createReducer(
  initialTeamState,
  on(LoadAchievements, (oldState: AchievementState) => {
    console.log('LoadAchievements');
    return {
      ...oldState,
      loading: true,
      teams: [],
    };
  }),
  on(AchievementsLoaded, (oldState: AchievementState, { data }) => {
    console.log('AchievementsLoaded');
    console.log('Data');
    return {
      ...oldState,
      loading: false,
      teams: data,
    };
  }),
  on(AchievementLoaded, (oldState: AchievementState, { data }) => {
    console.log('AchievementLoaded');
    return {
      ...oldState,
      teams: [...oldState.achievements.filter((a) => a._id !== data._id), data],
    };
  })
);
