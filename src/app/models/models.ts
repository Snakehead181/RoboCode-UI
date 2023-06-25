export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  authdata?: string;
}

export interface Team {
  _id: string;
  name: string;
  number: string;
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
