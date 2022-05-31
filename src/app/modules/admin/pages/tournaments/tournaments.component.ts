import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tournament } from 'src/app/shared/tournament';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'type',
    'categories',
    'places',
    'initDate',
  ];
  tournaments: Tournament[] = [];
  serviceSubscription: Subscription | undefined;

  constructor(private route: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.serviceSubscription = this.adminService
      .getTournaments()
      .subscribe((data: Tournament[]) => {
        this.tournaments = data;
      });
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }

  handleClick({ _id }: Tournament) {
    this.route.navigate([`/admin/tournament/${_id}/detail`])
  }
}
