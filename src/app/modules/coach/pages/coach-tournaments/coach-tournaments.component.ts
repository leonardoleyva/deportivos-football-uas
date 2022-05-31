import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/shared/tournament';
import { CoachService } from '../../services/coach.service';

@Component({
  selector: 'app-coach-tournaments',
  templateUrl: './coach-tournaments.component.html',
  styleUrls: ['./coach-tournaments.component.scss'],
})
export class CoachTournamentsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'type',
    'categories',
    'places',
    'initDate',
  ];
  tournaments: Tournament[] = [];
  serviceSubscription: Subscription | undefined;

  constructor(private route: Router, private coachService: CoachService) {}

  ngOnInit(): void {
    this.serviceSubscription = this.coachService
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
