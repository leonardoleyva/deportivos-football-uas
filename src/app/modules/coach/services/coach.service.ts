import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team, Tournament } from 'src/app/shared/tournament';
import { environment } from 'src/environments/environment';
import { TeamPayload, TournamentCategoriesResponse } from './type';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  private _serviceModule = '/coach';
  private _API_URL_SERVICE_MODULE = `${environment.API_URL}${this._serviceModule}`;

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.post<Tournament[]>(
      `${this._API_URL_SERVICE_MODULE}/tournaments`,
      {}
    );
  }

  getTournamentCategories(
    tournamentId: string
  ): Observable<TournamentCategoriesResponse> {
    return this.http.get<TournamentCategoriesResponse>(
      `${this._API_URL_SERVICE_MODULE}/tournament/${tournamentId}/mixed-categories`
    );
  }

  createTeam(tournamentId: string, payload: TeamPayload): Observable<Team> {
    return this.http.post<Team>(
      `${this._API_URL_SERVICE_MODULE}/tournament/${tournamentId}/team`,
      payload
    );
  }
}
