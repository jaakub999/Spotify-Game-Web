import { Session } from "./session";

export interface User {
  username: string;
  password: string;
  email: string;
  verified: boolean;
  sessions: Session[];
}
