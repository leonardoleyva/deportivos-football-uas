import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from 'src/app/shared/tournament';
import { environment } from 'src/environments/environment';
import { TournamentCategoriesResponse } from '../../coach/services/type';

@Injectable({
  providedIn: 'root'
})
export class RefereeService {
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
}
