import { Team } from 'src/app/models';
import { LoadTeams, TeamLoaded, TeamsLoaded } from './teams.actions';
import { createReducer, on } from '@ngrx/store';

export interface TeamState {
  loading: boolean;
  teams: Team[];
}

export const initialTeamState: TeamState = {
  loading: false,
  teams: [],
};

export const teamReducer = createReducer(
  initialTeamState,
  on(LoadTeams, (oldState: TeamState) => {
    console.log('LoadTeams');
    return {
      ...oldState,
      loading: true,
      teams: [],
    };
  }),
  on(TeamsLoaded, (oldState: TeamState, { data }) => {
    console.log('TeamsLoaded');
    console.log('Data');
    return {
      ...oldState,
      loading: false,
      teams: data,
    };
  }),
  on(TeamLoaded, (oldState: TeamState, { data }) => {
    console.log('TeamLoaded');
    return {
      ...oldState,
      teams: [...oldState.teams.filter((a) => a._id !== data._id), data],
    };
  })
);
