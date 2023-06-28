import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LoadMentors,
  MentorLoaded,
  MentorsLoaded,
} from '../state/mentors/mentors.actions';
import { HttpClient } from '@angular/common/http';
import { Mentor } from '../models';

@Injectable()
export class MentorService {
  constructor(private store: Store, private httpClient: HttpClient) {}

  getMentors(): void {
    console.log('Get Mentors');

    this.store.dispatch(LoadMentors());
    this.httpClient
      .get('http://localhost:3000/mentors')
      .subscribe((res: any) => {
        console.log('Get Mentors Response', { res });
        this.store.dispatch(MentorsLoaded({ data: res }));
      });
  }

  addMentor(mentor) {
    console.log('Add Mentor');
    return this.httpClient.post('http://localhost:3000/mentors', mentor);
  }

  getMentorDetails(mentorId: string) {
    this.httpClient
      .get('http://localhost:3000/mentors/' + mentorId)
      .subscribe((a) => {
        console.log('getMentor', { a });
        this.store.dispatch(MentorLoaded({ data: a as Mentor }));
      });
  }

  updateMentor(mentor: Mentor) {
    return this.httpClient.put(
      'http://localhost:3000/mentors' + mentor._id,
      mentor
    );
  }
}
