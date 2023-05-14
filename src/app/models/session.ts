import { User } from "./user";

export interface Session {
  host: string;
  code: string;
  playlistId: string;
  tracks: number;
  players: User[];
}
