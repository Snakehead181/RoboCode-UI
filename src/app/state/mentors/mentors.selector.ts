import { createSelector } from '@ngrx/store';
import { MentorState } from './mentors.reducer';

export const selectMentorState = (state) => state.mentor;

export const allMentors = createSelector(
  selectMentorState,
  (state: MentorState) => {
    return state.mentors;
  }
);
