import {
  City,
  TournamentBranch,
  TournamentCategory,
  TournamentType,
} from 'src/app/shared/tournament';
import { PrivateUser } from 'src/app/shared/user';

export interface FieldsetDataResponse {
  categories: TournamentCategory[];
  branches: TournamentBranch[];
  types: TournamentType[];
  cities: City[];
  admins: PrivateUser[];
  coaches: PrivateUser[];
  referees: PrivateUser[];
}

interface TournamentBodyParams {
  name: string
  type: string
  branches: string[]
  category: string
  dates: {
    init: string
    final: string
  }
  city: string
  places: string[]
  hours: string
  admins: string[]
  coaches: string[]
  referees: string[]
}

export interface CreateTournamentPayload extends TournamentBodyParams {}

export interface UpdateTournamentPayload
  extends Omit<TournamentBodyParams, 'branches' | 'category'> {}

export interface SetTournamentMatchesBodyParams {
  teamsIds: string[]
}

export interface UpdateTeamScoreBodyParams {
  teams: { _id: string, goals: number }[]
}

export interface FinishTournamentMatchBodyParams {
  teamsIds: string[]
}
