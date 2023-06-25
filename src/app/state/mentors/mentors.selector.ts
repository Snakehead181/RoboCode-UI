import { createSelector } from '@ngrx/store';
import { MentorState } from './mentors.reducer';
import { Mentor } from 'src/app/models';

export const selectMentorState = (state) => state.mentor;

export const allMentors = createSelector(
  selectMentorState,
  (state: MentorState) => {
    return state.mentors;
  }
);

export const mentorById = createSelector(
  allMentors,
  (mentors: Mentor[], id: string) => mentors.find((mentor) => mentor._id === id)
);

export const freeMentors = createSelector(allMentors, (mentors: Mentor[]) => {
  return mentors.filter((m) => {
    if (m.assignedTeam === '') {
      return true;
    }
    return false;
  });
});
