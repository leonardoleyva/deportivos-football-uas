import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTournamentComponent } from './modules/admin/pages/create-tournament/create-tournament.component';
import { EditTournamentComponent } from './modules/admin/pages/edit-tournament/edit-tournament.component';
import { ManageTreeTeamsComponent } from './modules/admin/pages/manage-tree-teams/manage-tree-teams.component';
import { TournamentDetailComponent } from './modules/admin/pages/tournament-detail/tournament-detail.component';
import { TournamentsComponent } from './modules/admin/pages/tournaments/tournaments.component';
import { CoachTournamentsComponent } from './modules/coach/pages/coach-tournaments/coach-tournaments.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'tournaments', component: TournamentsComponent },
      { path: 'tournament/create', component: CreateTournamentComponent },
      { path: 'tournament/:id/edit', component: EditTournamentComponent },
      { path: 'tournament/:id/detail', component: TournamentDetailComponent },
      {
        path: 'tournament/:id/category/:categoryId/teams/manage',
        component: ManageTreeTeamsComponent,
      },
    ],
  },
  {
    path: 'coach',
    children: [{ path: 'tournaments', component: CoachTournamentsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
