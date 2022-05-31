import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Place, Tournament } from 'src/app/shared/tournament';
import { parseDateToMMDDYYYY, parseMMDDYYYYtoDate } from 'src/app/shared/utils';
import { AdminService } from '../../services/admin.service';
import { FieldsetDataResponse } from '../../services/type';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.scss'],
})
export class EditTournamentComponent implements OnInit {
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

  form: {
    tournamentName: string;
    category: string;
    branches: string[];
    type: string;
    city: string;
    places: string[];
    startDate: string | Date;
    endDate: string | Date;
    hours: string;
    admins: string[];
    coaches: string[];
    referees: string[];
  } = {
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

  tournamentIdParam: string;
  tournament: Tournament | undefined;

  fieldsetDataSubscription: Subscription | undefined;
  placesSubscription: Subscription | undefined;
  getTournamentSubscription: Subscription | undefined;
  createTournamentSubscription: Subscription | undefined;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.tournamentIdParam =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.branchesFC.disable()
    this.loadFieldsetData();
    this.loadTournamentData();
  }

  ngOnDestroy(): void {
    this.fieldsetDataSubscription?.unsubscribe();
    this.placesSubscription?.unsubscribe();
    this.getTournamentSubscription?.unsubscribe();
    this.createTournamentSubscription?.unsubscribe();
  }

  loadFieldsetData() {
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

  loadPlacesData(cityId: string) {
    this.placesSubscription = this.adminService
      .getTournamentPlaces(cityId)
      .subscribe((data) => {
        this.fieldsetData.places = [...data.places];
      });
  }

  loadTournamentData() {
    this.getTournamentSubscription = this.adminService
      .getOneTournament(this.tournamentIdParam)
      .subscribe((data) => {
        this.tournament = data;
        this.form = {
          tournamentName: data.name,
          category: data.category._id,
          branches: data.branches.map(({ _id }) => _id) as never[],
          type: data.type._id,
          city: data.city._id,
          places: data.places.map(({ _id }) => _id) as never[],
          startDate: parseMMDDYYYYtoDate(data.dates.init),
          endDate: parseMMDDYYYYtoDate(data.dates.final),
          hours: data.hours,
          admins: data.officials.admins.map(({ _id }) => _id) as never[],
          coaches: data.officials.coaches.map(({ _id }) => _id) as never[],
          referees: data.officials.referees.map(({ _id }) => _id) as never[],
        };

        this.loadPlacesData(data.city._id)
      });
  }

  handleChangeCity({ value }: { source: any; value: string }) {
    this.placesSubscription = this.adminService
      .getTournamentPlaces(value)
      .subscribe((data) => {
        this.fieldsetData.places = [...data.places];
      });
  }

  handleCancel() {
    this.redirectToDetail();
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
    const init = parseDateToMMDDYYYY(startDate.toString());
    const final = parseDateToMMDDYYYY(endDate.toString());
    const payload = {
      name,
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
      .editTournament(this.tournamentIdParam, payload)
      .subscribe(() => {
        this.snackBar.open('Torneo actualizado exitosamente', 'X', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'],
        });
        this.redirectToDetail();
      });
  }

  redirectToDetail() {
    this.route.navigate([`/admin/tournament/${this.tournamentIdParam}/detail`]);
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
