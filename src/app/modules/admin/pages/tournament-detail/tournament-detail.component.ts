import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/shared/tournament';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss'],
})
export class TournamentDetailComponent implements OnInit, OnDestroy {
  tournamentIdParam: string;
  tournament: Tournament | undefined;
  serviceSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.tournamentIdParam = this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.serviceSubscription = this.adminService
      .getOneTournament(this.tournamentIdParam)
      .subscribe((data: Tournament) => {
        this.tournament = data;
      });
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }
}
