export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  authdata?: string;
}

export interface Team {
  _id: string;
  name: string;
  tableNumber: string;
  color: string;
  score: number;
  assignedMentor: AssignedMentor;
  achievements: Achievement[];
}

export interface AssignedTeam {
  _id: string;
  name: string;
}

export interface Mentor {
  _id: string;
  name: string;
  username?: string;
  password?: string;
  role?: string;
  assignedTeam: AssignedTeam;
}

export interface AssignedMentor {
  _id;
  name: string;
}

export interface MentorTeamMap {
  mentorId: string;
  teamId: string;
}

export interface Achievement {
  _id: string;
  name: string;
  description: string;
  points: number;
  requiresVerification: boolean;
  achievementType: string;
  completed: boolean;
}

export interface AchievementCompleted {
  _id: string;
  achievementId: string;
  team: Team;
}
