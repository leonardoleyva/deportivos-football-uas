import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTournamentComponent } from './modules/admin/pages/create-tournament/create-tournament.component';
import { TournamentsComponent } from './modules/admin/pages/tournaments/tournaments.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'tournaments', component: TournamentsComponent },
      { path: 'tournament/create', component: CreateTournamentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
