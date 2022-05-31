import { Tournament } from 'src/app/shared/tournament';

export type TournamentCategoriesResponse = Pick<
  Tournament,
  '_id' | 'name' | 'mixedCategories'
>;
