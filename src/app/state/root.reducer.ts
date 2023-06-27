import { achievementReducer } from './achievements/achievements.reducer';
import { mentorReducer } from './mentors/mentors.reducer';
import { teamReducer } from './teams/teams.reducer';

export const rootReducer = {
  mentor: mentorReducer,
  team: teamReducer,
  achievement: achievementReducer,
};
