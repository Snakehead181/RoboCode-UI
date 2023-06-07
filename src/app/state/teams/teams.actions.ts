import { createAction, props } from '@ngrx/store';
import { Team } from 'src/app/models';

export const LoadTeams = createAction('loadTeams');

export const TeamsLoaded = createAction(
  'teamsLoaded',
  props<{ data: Team[] }>()
);
export const TeamLoaded = createAction('teamLoaded', props<{ data: Team }>());
