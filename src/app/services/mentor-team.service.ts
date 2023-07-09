import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignedMentor, AssignedTeam } from '../models';

@Injectable()
export class MentorTeamService {
  constructor(private httpClient: HttpClient) {}

  updateMentorsAssignedTeam(id: string, assignedTeam: AssignedTeam) {
    console.log(`Updating mentor with ID: ${id} with`, assignedTeam);
    return this.httpClient
      .put('http://localhost:3000/assignedTeams/' + id, assignedTeam)
      .subscribe((res) => {
        console.log(res);
      });
  }

  updateTeamsAssignedMentors(id: string, assignedMentor: AssignedMentor) {
    console.log('Updating assigned mentor');
    return this.httpClient.put(
      'http://localhost:3000/assignedMentors/' + id,
      assignedMentor
    );
  }
}
