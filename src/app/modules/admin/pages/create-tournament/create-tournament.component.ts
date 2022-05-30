import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/shared/tournament';
import { AdminService } from '../../services/admin.service';
import { FieldsetDataResponse } from '../../services/type';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss'],
})
export class CreateTournamentComponent implements OnInit, OnDestroy {
  branchesFC = new FormControl();
  placesFC = new FormControl();
  adminsFC = new FormControl();
  coachesFC = new FormControl();
  refereesFC = new FormControl();
  fieldsetData: FieldsetDataResponse & { places?: Place[] } = {
    categories: [],
    branches: [],
    types: [],
    places: [],
    cities: [],
    admins: [],
    coaches: [],
    referees: [],
  };

  form = {
    tournamentName: '',
    category: '',
    branches: [],
    type: '',
    city: '',
    places: [],
    startDate: '',
    endDate: '',
    hours: '',
    admins: [],
    coaches: [],
    referees: [],
  };

  fieldsetDataSubscription: Subscription | undefined;
  placesSubscription: Subscription | undefined;
  createTournamentSubscription: Subscription | undefined;

  constructor(
    private route: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fieldsetDataSubscription = this.adminService
      .getTournamentFieldSetData()
      .subscribe((data) => {
        this.fieldsetData = {
          categories: [...data.categories],
          branches: [...data.branches],
          types: [...data.types],
          cities: [...data.cities],
          admins: [...data.admins],
          coaches: [...data.coaches],
          referees: [...data.referees],
        };
      });
  }

  ngOnDestroy(): void {
    this.fieldsetDataSubscription?.unsubscribe();
    this.placesSubscription?.unsubscribe();
    this.createTournamentSubscription?.unsubscribe();
  }

  handleChangeCity({ value }: { source: any; value: string }) {
    this.placesSubscription = this.adminService
      .getTournamentPlaces(value)
      .subscribe((data) => {
        this.fieldsetData.places = [...data.places];
      });
  }

  handleCancel() {
    this.redirectToTournaments();
  }

  handleSubmit() {
    const {
      tournamentName: name,
      category,
      branches,
      type,
      startDate,
      endDate,
      city,
      places,
      hours,
      admins,
      coaches,
      referees,
    } = this.form;
    const init = this.parseDateToDDMMYYYY(startDate);
    const final = this.parseDateToDDMMYYYY(endDate);
    const payload = {
      name,
      category,
      branches,
      type,
      dates: { init, final },
      city,
      places,
      hours,
      admins,
      coaches,
      referees,
    };

    this.createTournamentSubscription = this.adminService
      .createTournament(payload)
      .subscribe(() => {
        this.snackBar.open('Torneo creado exitosamente', 'X', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'],
        });
        this.redirectToTournaments();
      });
  }

  redirectToTournaments() {
    this.route.navigate(['/admin/tournaments']);
  }

  parseDateToDDMMYYYY(date: string) {
    return new Date(date)
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('/');
  }

  isFormDisabled() {
    return (
      !this.form.tournamentName ||
      !this.form.category ||
      !this.form.branches.length ||
      !this.form.type ||
      !this.form.city ||
      !this.form.places.length ||
      !this.form.startDate ||
      !this.form.endDate ||
      !this.form.hours ||
      !this.form.admins.length ||
      !this.form.coaches.length ||
      !this.form.referees.length
    );
  }
}
