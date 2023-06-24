import { createSelector } from '@ngrx/store';
import { TeamState } from './teams.reducer';

export const selectTeamState = (state) => state.team;

export const allTeams = createSelector(selectTeamState, (state: TeamState) => {
  return state.teams;
});
