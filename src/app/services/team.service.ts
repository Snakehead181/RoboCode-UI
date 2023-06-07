import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadTeams, TeamsLoaded } from '../state/teams/teams.actions';
import { Store } from '@ngrx/store';

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
}
