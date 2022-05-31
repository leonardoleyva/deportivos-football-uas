import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoachService } from '../../services/coach.service';
import { TournamentCategoriesResponse } from '../../services/type';

@Component({
  selector: 'app-coach-tournament-categories',
  templateUrl: './coach-tournament-categories.component.html',
  styleUrls: ['./coach-tournament-categories.component.scss'],
})
export class CoachTournamentCategoriesComponent implements OnInit, OnDestroy {
  tournamentIdParam: string;
  tournament: TournamentCategoriesResponse | undefined;

  categoriesSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coachService: CoachService
  ) {
    this.tournamentIdParam =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.coachService
      .getTournamentCategories(this.tournamentIdParam)
      .subscribe((data: TournamentCategoriesResponse) => {
        this.tournament = data;
      });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
  }
}
