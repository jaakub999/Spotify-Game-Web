import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SpotifyPlaylist } from "../models/spotify-playlist";
import { API_BASE_URL } from "../config/constants";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private readonly baseUrl = `${API_BASE_URL}/spotify`;

  constructor(private http: HttpClient) {}

  searchPlaylists(query: string): Observable<SpotifyPlaylist[]> {
    return this.http.get<SpotifyPlaylist[]>(`${this.baseUrl}/playlists?q=${query}`);
  }
}
