import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place, Team, Tournament } from 'src/app/shared/tournament';
import { environment } from 'src/environments/environment';
import {
  CreateTournamentPayload,
  FieldsetDataResponse,
  UpdateTournamentPayload,
} from './type';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _serviceModule = '/admin';
  private _API_URL_SERVICE_MODULE = `${environment.API_URL}${this._serviceModule}`;

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.post<Tournament[]>(
      `${this._API_URL_SERVICE_MODULE}/tournaments`,
      {}
    );
  }

  getOneTournament(tournamentId: string): Observable<Tournament> {
    return this.http.get<Tournament>(
      `${this._API_URL_SERVICE_MODULE}/tournament/${tournamentId}`
    );
  }

  getTournamentFieldSetData(): Observable<FieldsetDataResponse> {
    return this.http.get<FieldsetDataResponse>(
      `${this._API_URL_SERVICE_MODULE}/tournament/fieldset-data/all`
    );
  }

  getTournamentPlaces(cityId: string): Observable<{ places: Place[] }> {
    return this.http.get<{ places: Place[] }>(
      `${this._API_URL_SERVICE_MODULE}/tournament/fieldset-data/places/${cityId}`
    );
  }

  createTournament(payload: CreateTournamentPayload): Observable<Tournament> {
    return this.http.post<Tournament>(
      `${this._API_URL_SERVICE_MODULE}/tournament`,
      payload
    );
  }

  editTournament(
    tournamentId: string,
    payload: UpdateTournamentPayload
  ): Observable<Tournament> {
    return this.http.put<Tournament>(
      `${this._API_URL_SERVICE_MODULE}/tournament/${tournamentId}`,
      payload
    );
  }

  // TODO: Apply correct sub-module URL when API is updated its routes
  getTeams(tournamentId: string, mixedCategoryId: string): Observable<Team[]> {
    return this.http.get<Team[]>(
      `${environment.API_URL}/coach/tournament/${tournamentId}/category/${mixedCategoryId}/teams`
    );
  }
}
