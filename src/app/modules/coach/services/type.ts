import { Player, Tournament } from 'src/app/shared/tournament';

export type TournamentCategoriesResponse = Pick<
  Tournament,
  '_id' | 'name' | 'mixedCategories'
>;

export interface TeamPayload {
  name: string;
  categoryId: string;
  players: Omit<Player, '_id'>[]
  image: string;
}
