import { createAction, props } from '@ngrx/store';
import { Achievement, Team } from 'src/app/models';

export const LoadAchievements = createAction('loadAchievements');

export const AchievementsLoaded = createAction(
  'achievementsLoaded',
  props<{ data: Achievement[] }>()
);
export const AchievementLoaded = createAction(
  'achievementLoaded',
  props<{ data: Achievement }>()
);
