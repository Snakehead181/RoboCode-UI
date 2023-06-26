import { Route } from '@angular/router';
import { MentorsComponent } from './mentors.component';
import { MentorComponent } from './mentor/mentor.component';

export const MENTORS_ROUTES: Route[] = [
  { path: '', component: MentorsComponent },
  { path: ':id', component: MentorComponent },
];
