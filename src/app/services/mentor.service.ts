import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadMentors, MentorsLoaded } from '../state/mentors/mentors.actions';
import { HttpClient } from '@angular/common/http';

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
}
