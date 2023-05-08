export interface SpotifyPlaylist {
  name: string;
  tracks: {
    href: string;
    total: number;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  uri: string;
}
