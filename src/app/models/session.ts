import { User } from "./user";
import { TrackGroup } from "./track-group";

export interface Session {
  host: string;
  code: string;
  playlistId: string;
  active: boolean;
  date: string;
  players: User[];
  trackGroups: TrackGroup[];
}
