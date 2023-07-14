import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignedMentor, AssignedTeam } from '../models';

@Injectable()
export class MentorTeamService {
  constructor(private httpClient: HttpClient) {}

  updateMentorsAssignedTeam(id: string, assignedTeam: AssignedTeam) {
    console.log(`Updating mentor with ID: ${id} with`, assignedTeam);
    return this.httpClient.put(
      'https://robocode-392510.appspot.com/assignedTeams/' + id,
      assignedTeam
    );
  }

  updateTeamsAssignedMentors(id: string, assignedMentor: AssignedMentor) {
    console.log('Updating assigned mentor');
    return this.httpClient.put(
      'https://robocode-392510.appspot.com/assignedMentors/' + id,
      assignedMentor
    );
  }
}
