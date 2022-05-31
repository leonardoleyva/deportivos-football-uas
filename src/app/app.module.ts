import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './modules/admin/pages/tournaments/tournaments.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateTournamentComponent } from './modules/admin/pages/create-tournament/create-tournament.component';
import { TournamentDetailComponent } from './modules/admin/pages/tournament-detail/tournament-detail.component';
import { EditTournamentComponent } from './modules/admin/pages/edit-tournament/edit-tournament.component';
import { ManageTreeTeamsComponent } from './modules/admin/pages/manage-tree-teams/manage-tree-teams.component';
import { CoachTournamentsComponent } from './modules/coach/pages/coach-tournaments/coach-tournaments.component';

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    SidebarComponent,
    MainLayoutComponent,
    CreateTournamentComponent,
    TournamentDetailComponent,
    EditTournamentComponent,
    ManageTreeTeamsComponent,
    CoachTournamentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
