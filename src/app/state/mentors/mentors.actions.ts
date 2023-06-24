import { createAction, props } from '@ngrx/store';
import { Mentor } from 'src/app/models';

export const LoadMentors = createAction('loadMentors');

export const MentorsLoaded = createAction(
  'MentorsLoaded',
  props<{ data: Mentor[] }>()
);
export const MentorLoaded = createAction(
  'mentorLoaded',
  props<{ data: Mentor }>()
);
