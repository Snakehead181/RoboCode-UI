import { Mentor } from 'src/app/models';
import { LoadMentors, MentorLoaded, MentorsLoaded } from './mentors.actions';
import { createReducer, on } from '@ngrx/store';

export interface MentorState {
  loading: boolean;
  mentors: Mentor[];
}

export const initialMentorState: MentorState = {
  loading: false,
  mentors: [],
};

export const mentorReducer = createReducer(
  initialMentorState,
  on(LoadMentors, (oldState: MentorState) => {
    return {
      ...oldState,
      loading: true,
      mentors: [],
    };
  }),
  on(MentorsLoaded, (oldState: MentorState, { data }) => {
    return {
      ...oldState,
      loading: false,
      mentors: data,
    };
  }),
  on(MentorLoaded, (oldState: MentorState, { data }) => {
    console.log('MentorLoaded');
    return {
      ...oldState,
      mentors: [...oldState.mentors.filter((a) => a._id !== data._id), data],
    };
  })
);
