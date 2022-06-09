import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RefereeService } from 'src/app/modules/referee/services/referee.service';
import { Tournament } from 'src/app/shared/tournament';

@Component({
  selector: 'app-referee-tournaments',
  templateUrl: './referee-tournaments.component.html',
  styleUrls: ['./referee-tournaments.component.scss'],
})
export class RefereeTournamentsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'type',
    'categories',
    'places',
    'initDate',
  ];
  tournaments: Tournament[] = [];
  serviceSubscription: Subscription | undefined;

  constructor(private route: Router, private refereeServices: RefereeService) {}

  ngOnInit(): void {
    this.serviceSubscription = this.refereeServices
      .getTournaments()
      .subscribe((data: Tournament[]) => {
        this.tournaments = data;
      });
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }

  handleClick({ _id }: Tournament) {
    this.route.navigate([`/coach/tournament/${_id}/categories`]);
  }
}
