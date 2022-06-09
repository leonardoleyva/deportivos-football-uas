import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
  teams: Team[] = [];
  // The next two states are available teams to apply drag and drop
  teamsReadyToPlay: Team[] = [];
  selectedTeams: (Team & { opponent?: string })[] = [];

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
}
