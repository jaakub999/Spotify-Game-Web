import { User } from "./user";

export interface Session {
  host: string;
  started: boolean
  code: string;
  players: User[];
}
