import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place, Tournament } from 'src/app/shared/tournament';
import { environment } from 'src/environments/environment';
import { CreateTournamentPayload, FieldsetDataResponse } from './type';

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
}
