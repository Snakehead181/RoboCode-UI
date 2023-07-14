import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LoadMentors,
  MentorLoaded,
  MentorsLoaded,
} from '../state/mentors/mentors.actions';
import { HttpClient } from '@angular/common/http';
import { Mentor } from '../models';
import { Observable, of } from 'rxjs';

@Injectable()
export class MentorService {
  constructor(private store: Store, private httpClient: HttpClient) {}

  getMentors(): void {
    this.store.dispatch(LoadMentors());
    this.httpClient
      .get('https://robocode-392510.appspot.com/mentors')
      .subscribe((res: any) => {
        this.store.dispatch(MentorsLoaded({ data: res }));
      });
  }

  addMentor(mentor) {
    return this.httpClient.post(
      'https://robocode-392510.appspot.com/mentors',
      mentor
    );
  }

  getMentorDetails(mentorId: string) {
    this.httpClient
      .get('https://robocode-392510.appspot.com/mentors/' + mentorId)
      .subscribe((a) => {
        this.store.dispatch(MentorLoaded({ data: a as Mentor }));
      });
  }

  updateMentor(mentor: Mentor) {
    console.log(mentor);
    return this.httpClient.put(
      'https://robocode-392510.appspot.com/mentors/' + mentor._id,
      mentor
    );
  }

  removeMentor(teamId: string) {
    return this.httpClient
      .delete('https://robocode-392510.appspot.com/mentors/' + teamId)
      .subscribe(() => console.log('Mentor Deleted'));
  }
}
