import { TrackGroup } from "./track-group";

export interface SpotifyTrack {
  uri: string;
  name: string;
  artist: string;
  played: boolean;
  trackGroup: TrackGroup;
}
