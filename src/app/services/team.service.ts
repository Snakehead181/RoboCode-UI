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
    this.store.dispatch(LoadTeams());
    this.httpClient
      .get('https://robocode-392510.appspot.com/teams')
      .subscribe((res: any) => {
        this.store.dispatch(TeamsLoaded({ data: res }));
      });
  }

  getTeamDetails(teamId: string): void {
    this.httpClient
      .get('https://robocode-392510.appspot.com/teams/' + teamId)
      .subscribe((t) => {
        this.store.dispatch(TeamLoaded({ data: t as Team }));
      });
  }

  addTeam(team) {
    return this.httpClient.post(
      'https://robocode-392510.appspot.com/teams',
      team
    );
  }

  removeTeam(teamId: string, mentorId: string) {
    console.log(teamId);
    return this.httpClient.delete(
      'https://robocode-392510.appspot.com/teams/' + teamId,
      {
        body: { mentor: mentorId },
      }
    );
  }

  updateTeam(id: string, team: Team) {
    console.log('Update Team');
    return this.httpClient.put(
      'https://robocode-392510.appspot.com/teams/' + id,
      team
    );
  }

  updateTeamAchievements(
    achievementId: string,
    teamId: string,
    achievementCompleted: boolean,
    achievementPoints: number
  ) {
    console.log('Update Team Achievements');

    return this.httpClient.put(
      'https://robocode-392510.appspot.com/teamAchievements/' + teamId,
      {
        achievementId: achievementId,
        completed: achievementCompleted,
        points: achievementPoints,
      }
    );
  }
}
