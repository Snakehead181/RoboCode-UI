import { createSelector } from '@ngrx/store';
import { TeamState } from './teams.reducer';
import { Team } from 'src/app/models';

export const selectTeamState = (state) => state.team;

export const allTeams = createSelector(selectTeamState, (state: TeamState) => {
  return state.teams;
});

export const teamById = createSelector(allTeams, (teams: Team[], id: string) =>
  teams.find((team) => team._id === id)
);
