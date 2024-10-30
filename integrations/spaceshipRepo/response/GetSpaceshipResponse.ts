import SpaceShip from '@/domain/entities/SpaceShip';
import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';

export default interface GetSpaceshipResponse {
  data: {
    allStarships: {
      starships: SpaceShip[];
      pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
      };
    };
  };
}

export function fromResponseToSearchSpaceshipResult(
  response: GetSpaceshipResponse,
): SpaceshipSearchResult {
  return {
    ships: response.data.allStarships.starships,
    cursor: response.data.allStarships.pageInfo.endCursor,
    hasMore: response.data.allStarships.pageInfo.hasNextPage,
  };
}
