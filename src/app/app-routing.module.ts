import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTournamentComponent } from './modules/admin/pages/create-tournament/create-tournament.component';
import { EditTournamentComponent } from './modules/admin/pages/edit-tournament/edit-tournament.component';
import { ManageTreeTeamsComponent } from './modules/admin/pages/manage-tree-teams/manage-tree-teams.component';
import { TournamentDetailComponent } from './modules/admin/pages/tournament-detail/tournament-detail.component';
import { TournamentsComponent } from './modules/admin/pages/tournaments/tournaments.component';
import { CoachTournamentCategoriesComponent } from './modules/coach/pages/coach-tournament-categories/coach-tournament-categories.component';
import { CoachTournamentsComponent } from './modules/coach/pages/coach-tournaments/coach-tournaments.component';
import { CreateTeamComponent } from './modules/coach/pages/create-team/create-team.component';
import { RefereeTournamentCategoriesComponent } from './modules/referee/pages/referee-tournament-categories/referee-tournament-categories.component';
import { RefereeTournamentsComponent } from './modules/referee/pages/referee-tournaments/referee-tournaments.component';
import { TournamentHistoryComponent } from './modules/referee/pages/tournament-history/tournament-history.component';

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
      { path: '**', redirectTo: 'tournaments' },
    ],
  },
  {
    path: 'coach',
    children: [
      { path: 'tournaments', component: CoachTournamentsComponent },
      {
        path: 'tournament/:id/categories',
        component: CoachTournamentCategoriesComponent,
      },
      {
        path: 'tournament/:id/category/:categoryId/team/create',
        component: CreateTeamComponent,
      },
      { path: '**', redirectTo: 'tournaments' },
    ],
  },
  {
    path: 'referee',
    children: [
      { path: 'tournaments', component: RefereeTournamentsComponent },
      {
        path: 'tournament/:id/categories',
        component: RefereeTournamentCategoriesComponent,
      },
      {
        path: 'tournament/:id/category/:categoryId/history',
        component: TournamentHistoryComponent,
      },
      { path: '**', redirectTo: 'tournaments' },
    ],
  },
  { path: '**', redirectTo: 'admin/tournaments' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
