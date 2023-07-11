import { createSelector } from '@ngrx/store';
import { MentorState } from './mentors.reducer';
import { Mentor } from 'src/app/models';

export const selectMentorState = (state) => state.mentor;

export const allMentors = createSelector(
  selectMentorState,
  (state: MentorState) => {
    return state.mentors.filter((mentor) => !mentor.isHidden);
  }
);

export const mentorById = createSelector(
  allMentors,
  (mentors: Mentor[], id: string) => mentors.find((mentor) => mentor._id === id)
);

export const freeMentors = createSelector(allMentors, (mentors: Mentor[]) => {
  return mentors.filter((m) => {
    console.log(m);
    if (m.assignedTeam._id === '') {
      return true;
    }
    return false;
  });
});

export const mentorNameById = createSelector(
  allMentors,
  (mentors: Mentor[], assignedMentorId: string) => {
    for (let mentor of mentors) {
      console.log(mentor);
      if (mentor._id === assignedMentorId) {
        return mentor.name;
      }
      return `Mentor with ID: ${mentor._id} not found`;
    }
    return '';
  }
);
