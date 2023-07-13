import { Route } from '@angular/router';
import { MentorsComponent } from './mentors.component';
import { MentorComponent } from './mentor/mentor.component';
import { EditMentorComponent } from './edit-mentor/edit-mentor.component';
import { AdminGuard } from '../helpers/admin.guard';
import { MentorGuard } from '../helpers/mentor.guard';

export const MENTORS_ROUTES: Route[] = [
  { path: '', component: MentorsComponent, canActivate: [AdminGuard] },
  { path: ':id', component: MentorComponent, canActivate: [MentorGuard] },
  {
    path: ':id/edit',
    component: EditMentorComponent,
    canActivate: [AdminGuard],
  },
];
