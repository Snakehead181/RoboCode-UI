import { createAction, props } from '@ngrx/store';
import { Team } from 'src/app/models';

export const LoadAchievements = createAction('loadTeams');

export const AchievementsLoaded = createAction(
  'achievementsLoaded',
  props<{ data: Team[] }>()
);
export const AchievementLoaded = createAction(
  'achievementLoaded',
  props<{ data: Team }>()
);
