import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Team,
  Tournament,
  TournamentCategory,
  TournamentMatch,
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
  teams: Team[] = [];
  loading: boolean = true;
  tournamentMatch: TournamentMatch | null = null;
  // The next two states are available teams to apply drag and drop
  teamsReadyToPlay: Team[] = [];
  selectedTeams: (Team & { opponent?: string })[] = [];

  tournamentSubscription: Subscription | undefined;
  teamsSubscription: Subscription | undefined;
  matchesSubscription: Subscription | undefined;
  createMatchesSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.tournamentIdParam = this.route.snapshot.paramMap.get('id') ?? '';
    this.categoryIdParam = this.route.snapshot.paramMap.get('categoryId') ?? '';
  }

  ngOnInit(): void {
    this.fetchMatches();

    this.tournamentSubscription = this.adminService
      .getOneTournament(this.tournamentIdParam)
      .subscribe((data: Tournament) => {
        this.category = data.mixedCategories.find(
          ({ _id }) => _id === this.categoryIdParam
        );
      });

    this.teamsSubscription = this.adminService
      .getTeams(this.tournamentIdParam, this.categoryIdParam)
      .subscribe((data: Team[]) => {
        this.teams = data;
        this.teamsReadyToPlay = data;
      });
  }

  ngOnDestroy(): void {
    this.tournamentSubscription?.unsubscribe();
    this.teamsSubscription?.unsubscribe();
    this.createMatchesSubscription?.unsubscribe();
    this.matchesSubscription?.unsubscribe();
  }

  drop(event: CdkDragDrop<Team[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    for (let i in this.selectedTeams) {
      const index = parseInt(i);
      if (index % 2 === 0) {
        if (index === this.selectedTeams.length - 1) {
          this.selectedTeams[index].opponent = '';
          continue;
        }

        this.selectedTeams[index].opponent = this.selectedTeams[index + 1].name;
        continue;
      }
      this.selectedTeams[index].opponent = this.selectedTeams[index - 1].name;
    }
  }

  fetchMatches() {
    this.matchesSubscription = this.adminService.getTournamentMatchesByCategory(
      this.tournamentIdParam,
      this.categoryIdParam
    ).subscribe((data: TournamentMatch) => {
      this.tournamentMatch = data;
      this.loading = false;
    });
  }

  isSubmitMatchesDisabled() {
    return !(
      this.selectedTeams.length === 4 ||
      this.selectedTeams.length === 8 ||
      this.selectedTeams.length === 16
    );
  }

  handleSubmitMatches() {
    const teamsIds = this.selectedTeams.map((team) => team._id);

    this.createMatchesSubscription = this.adminService
      .setTournamentMatchesByCategory(
        this.tournamentIdParam,
        this.categoryIdParam,
        teamsIds
      )
      .subscribe(() => {
        this.snackBar.open('Partidos generados exitosamente', 'X', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'],
        });

        this.fetchMatches();
      });
  }
}
