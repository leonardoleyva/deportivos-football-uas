import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RefereeService } from 'src/app/modules/referee/services/referee.service';
import { TournamentCategoriesResponse } from 'src/app/modules/coach/services/type';

@Component({
  selector: 'app-referee-tournament-categories',
  templateUrl: './referee-tournament-categories.component.html',
  styleUrls: ['./referee-tournament-categories.component.scss'],
})
export class RefereeTournamentCategoriesComponent implements OnInit {
  tournamentIdParam: string;
  tournament: TournamentCategoriesResponse | undefined;

  categoriesSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private refereeService: RefereeService
  ) {
    this.tournamentIdParam =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.refereeService
      .getTournamentCategories(this.tournamentIdParam)
      .subscribe((data: TournamentCategoriesResponse) => {
        this.tournament = data;
      });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
  }
}
