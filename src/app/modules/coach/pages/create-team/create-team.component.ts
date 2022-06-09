import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { Team } from 'src/app/shared/tournament';
import { toBase64 } from 'src/app/shared/utils';
import { CoachService } from '../../services/coach.service';
import { TeamPayload, TournamentCategoriesResponse } from '../../services/type';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit, OnDestroy {
  @ViewChild('playerFormInputName') playerFormInputName: ElementRef | undefined;

  tournamentIdParam: string;
  categoryIdParam: string;
  tournament: TournamentCategoriesResponse | undefined;
  teams: Team[] = [];

  tournamentSubscription: Subscription | undefined;
  teamsSubscription: Subscription | undefined;
  createTeamSubscription: Subscription | undefined;

  playersList: { name: string; curp: string; playerNumber: number }[] = [];

  teamForm = {
    name: '',
    logo: '',
  };
  playerForm = {
    name: '',
    curp: '',
    playerNumber: 0,
  };

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private coachService: CoachService,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.tournamentIdParam =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.categoryIdParam =
      this.activatedRoute.snapshot.paramMap.get('categoryId') ?? '';
  }

  ngOnInit(): void {
    this.teamsSubscription = this.adminService
      .getTeams(this.tournamentIdParam, this.categoryIdParam)
      .subscribe((data: Team[]) => {
        this.teams = data;
      });

    this.tournamentSubscription = this.coachService
      .getTournamentCategories(this.tournamentIdParam)
      .subscribe((data: TournamentCategoriesResponse) => {
        this.tournament = data;
      });
  }

  ngOnDestroy(): void {
    this.tournamentSubscription?.unsubscribe();
    this.teamsSubscription?.unsubscribe();
    this.createTeamSubscription?.unsubscribe();
  }

  isAddPlayerDisabled() {
    return (
      !this.playerForm.name ||
      !this.playerForm.playerNumber ||
      this.playerForm.curp.length !== 18
    );
  }

  isSubmitTeamDisabled() {
    return !this.teamForm.name || this.playersList.length < 5;
  }

  getCategory() {
    return this.tournament?.mixedCategories.find(
      (category) => category._id === this.categoryIdParam
    )?.name;
  }

  handleAddPlayer() {
    const { playerNumber, ...restData } = this.playerForm;

    const player = this.playersList.find(
      (pl) => pl.playerNumber === playerNumber
    );

    if (player?.name) return;

    this.playersList.push({
      ...restData,
      playerNumber,
    });

    this.cleanPlayerForm();
    this.playerFormInputName?.nativeElement.focus();
  }

  cleanPlayerForm() {
    this.playerForm = {
      name: '',
      curp: '',
      playerNumber: 0,
    };
  }

  handleRemovePlayer(playerNumber: number) {
    this.playersList = [
      ...this.playersList.filter(
        (player) => player.playerNumber !== playerNumber
      ),
    ];
  }

  async handleUpTeamLogo(ev: any) {
    const imageFile = ev.target.files[0];
    const base64ImgFile = (await toBase64(imageFile)) as string;
    this.teamForm.logo = base64ImgFile.split(',')[1];
  }

  handleSubmitTeam() {
    const payload: TeamPayload = {
      name: this.teamForm.name,
      categoryId: this.categoryIdParam,
      players: [...this.playersList],
      image: this.teamForm.logo,
    };

    this.createTeamSubscription = this.coachService
      .createTeam(this.tournamentIdParam, payload)
      .subscribe(() => {
        this.snackBar.open('Equipo creado exitosamente', 'X', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success'],
        });
        this.route.navigate([
          `/coach/tournament/${this.tournamentIdParam}/categories`,
        ]);
      });
  }
}
