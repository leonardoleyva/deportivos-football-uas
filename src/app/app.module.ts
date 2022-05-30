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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TournamentsComponent } from './modules/admin/pages/tournaments/tournaments.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateTournamentComponent } from './modules/admin/pages/create-tournament/create-tournament.component';
import { TournamentDetailComponent } from './modules/admin/pages/tournament-detail/tournament-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    SidebarComponent,
    MainLayoutComponent,
    CreateTournamentComponent,
    TournamentDetailComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
