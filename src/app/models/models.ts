import { AchievementType } from './types';

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  authLevel: string;
  authdata?: string;
}

export interface Team {
  _id: string;
  name: string;
  tableNumber: string;
  color: string;
  score: number;
  assignedMentor: string;
}

export interface Mentor {
  _id: string;
  name: string;
  username: string;
  password: string;
  assignedTeam: string;
}

export interface Achievement {
  _id: string;
  name: string;
  description: string;
  points: number;
  requiresVerification: boolean;
  achievementType: string;
}
