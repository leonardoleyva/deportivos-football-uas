import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { TeamOnMatch, Tournament } from 'src/app/shared/tournament';
import { RefereeService } from '../../services/referee.service';
import { UpdateTeamsScoresPayload } from '../../services/type';

@Component({
  selector: 'app-manage-match-score',
  templateUrl: './manage-match-score.component.html',
  styleUrls: ['./manage-match-score.component.scss'],
})
export class ManageMatchScoreComponent implements OnInit {
  tournamentIdParam: string;
  categoryIdParam: string;
  matchTeamsIds: string;
  tournament: Tournament | undefined;
  match: TeamOnMatch[] = [];

  scores = {
    teamOne: 0,
    teamTwo: 0,
  };

  tournamentSubscription: Subscription | undefined;
  matchSubscription: Subscription | undefined;
  updateScoresSubscription: Subscription | undefined;
  updateStatusSubscription: Subscription | undefined;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private refereeService: RefereeService,
    private snackBar: MatSnackBar
  ) {
    this.tournamentIdParam =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.categoryIdParam =
      this.activatedRoute.snapshot.paramMap.get('categoryId') ?? '';
    this.matchTeamsIds =
      this.activatedRoute.snapshot.paramMap.get('matchTeamsIds') ?? '';
  }

  ngOnInit(): void {
    this.tournamentSubscription = this.adminService
      .getOneTournament(this.tournamentIdParam)
      .subscribe((data: Tournament) => {
        this.tournament = data;
      });

    this.matchSubscription = this.refereeService
      .getMatch(
        this.tournamentIdParam,
        this.categoryIdParam,
        this.matchTeamsIds.split('---')
      )
      .subscribe((data: TeamOnMatch[][]) => {
        console.log(data)
        this.match = data[0];
        this.scores.teamOne = data[0][0].goals;
        this.scores.teamTwo = data[0][1].goals;
      });
  }

  ngOnDestroy(): void {
    this.tournamentSubscription?.unsubscribe();
    this.matchSubscription?.unsubscribe();
    this.updateScoresSubscription?.unsubscribe();
    this.updateStatusSubscription?.unsubscribe();
  }

  incrementTeamOneScore() {
    this.scores.teamOne += 1;
  }

  incrementTeamTwoScore() {
    this.scores.teamTwo += 1;
  }

  decrementTeamOneScore() {
    if (!this.scores.teamOne) return;
    this.scores.teamOne -= 1;
  }

  decrementTeamTwoScore() {
    if (!this.scores.teamTwo) return;
    this.scores.teamTwo -= 1;
  }

  handleSubmitGoals() {
    const teams = [
      { _id: this.match[0]._id, goals: this.scores.teamOne },
      { _id: this.match[1]._id, goals: this.scores.teamTwo },
    ];

    this.updateScoresSubscription = this.refereeService
      .updateTeamsScores(this.tournamentIdParam, this.categoryIdParam, {
        teams,
      })
      .subscribe(() => {
        this.snackBar.open('Puntajes actualizados exitosamente', 'X', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'],
        });
      });
  }

  handleSubmitFinishMatch() {
    this.updateScoresSubscription = this.refereeService
      .finishMatch(
        this.tournamentIdParam,
        this.categoryIdParam,
        this.match.map((m) => m._id)
      )
      .subscribe(() => {
        this.snackBar.open('Partido finalizado exitosamente', 'X', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'],
        });
        this.route.navigate([
          `/referee/tournament/${this.tournamentIdParam}/category/${this.categoryIdParam}/history`,
        ]);
      });
  }
}
