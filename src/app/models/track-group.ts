import { SpotifyTrack } from "./spotify-track";
import { Session } from "./session";

export interface TrackGroup {
  tracks: SpotifyTrack[];
  session: Session;
}
