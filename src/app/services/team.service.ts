import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoadTeams,
  TeamLoaded,
  TeamsLoaded,
} from '../state/teams/teams.actions';
import { Store } from '@ngrx/store';
import { Team } from '../models';

@Injectable()
export class TeamService {
  constructor(private httpClient: HttpClient, private store: Store) {}

  getTeams(): void {
    console.log('Get Teams');

    this.store.dispatch(LoadTeams());
    this.httpClient.get('http://localhost:3000/teams').subscribe((res: any) => {
      console.log('Get Teams Response', { res });
      this.store.dispatch(TeamsLoaded({ data: res }));
    });
  }

  getTeamDetails(teamId: string): void {
    this.httpClient
      .get('http://localhost:3000/teams/' + teamId)
      .subscribe((t) => {
        console.log('getTeam', { t });
        this.store.dispatch(TeamLoaded({ data: t as Team }));
      });
  }

  addTeam(team) {
    console.log('Add Team');
    return this.httpClient.post('http://localhost:3000/teams', team);
  }

  removeTeam(teamId: string) {
    console.log(teamId);
    return this.httpClient
      .delete('http://localhost:3000/teams/' + teamId)
      .subscribe(() => console.log('User Deleted'));
  }

  updateTeam(id: string, team: Team) {
    console.log('Update Team');
    return this.httpClient.put('http://localhost:3000/teams/' + id, team);
  }
}
