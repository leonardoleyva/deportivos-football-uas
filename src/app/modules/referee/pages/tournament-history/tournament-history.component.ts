import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import {
  TeamOnMatch,
  Tournament,
  TournamentMatch,
} from 'src/app/shared/tournament';

@Component({
  selector: 'app-tournament-history',
  templateUrl: './tournament-history.component.html',
  styleUrls: ['./tournament-history.component.scss'],
})
export class TournamentHistoryComponent implements OnInit {
  tournamentIdParam: string;
  categoryIdParam: string;
  tournament: Tournament | undefined;
  tournamentMatch: TournamentMatch | null = null;

  tournamentSubscription: Subscription | undefined;
  matchesSubscription: Subscription | undefined;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.tournamentIdParam =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.categoryIdParam =
      this.activatedRoute.snapshot.paramMap.get('categoryId') ?? '';
  }

  ngOnInit(): void {
    this.fetchMatches();

    this.tournamentSubscription = this.adminService
      .getOneTournament(this.tournamentIdParam)
      .subscribe((data: Tournament) => {
        this.tournament = data;
      });
  }

  ngOnDestroy(): void {
    this.tournamentSubscription?.unsubscribe();
    this.matchesSubscription?.unsubscribe();
  }

  fetchMatches() {
    this.matchesSubscription = this.adminService
      .getTournamentMatchesByCategory(
        this.tournamentIdParam,
        this.categoryIdParam
      )
      .subscribe((data: TournamentMatch) => {
        this.tournamentMatch = data;
      });
  }

  getCategory() {
    return this.tournament?.mixedCategories.find(
      (category) => category._id === this.categoryIdParam
    )?.name;
  }

  handleNavigateToMatchScore(match: TeamOnMatch[]) {
    this.route.navigate([
      `/referee/tournament/${this.tournamentIdParam}/category/${this.categoryIdParam}/match/${match[0]._id}---${match[1]._id}/score`,
    ]);
  }
}
