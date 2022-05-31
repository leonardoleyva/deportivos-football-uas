import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Team,
  Tournament,
  TournamentCategory,
} from 'src/app/shared/tournament';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-manage-tree-teams',
  templateUrl: './manage-tree-teams.component.html',
  styleUrls: ['./manage-tree-teams.component.scss'],
})
export class ManageTreeTeamsComponent implements OnInit, OnDestroy {
  tournamentIdParam: string;
  categoryIdParam: string;
  category: TournamentCategory | undefined;
  teams: Team[] | undefined;

  tournamentSubscription: Subscription | undefined;
  teamsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.tournamentIdParam = this.route.snapshot.paramMap.get('id') ?? '';
    this.categoryIdParam = this.route.snapshot.paramMap.get('categoryId') ?? '';
  }

  ngOnInit(): void {
    this.tournamentSubscription = this.adminService
      .getOneTournament(this.tournamentIdParam)
      .subscribe((data: Tournament) => {
        this.category = data.mixedCategories.find(
          ({ _id }) => _id === this.categoryIdParam
        );
      });

    this.tournamentSubscription = this.adminService
      .getTeams(this.tournamentIdParam, this.categoryIdParam)
      .subscribe((data: Team[]) => {
        this.teams = data;
      });
  }

  ngOnDestroy(): void {
    this.tournamentSubscription?.unsubscribe();
    this.teamsSubscription?.unsubscribe();
  }
}
