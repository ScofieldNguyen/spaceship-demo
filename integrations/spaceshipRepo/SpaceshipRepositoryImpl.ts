import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';
import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';
import ApiClient from '@/integrations/spaceshipRepo/ApiClient';
import { fromResponseToSearchSpaceshipResult } from '@/integrations/spaceshipRepo/response/GetSpaceshipResponse';

export const ITEMS_PER_PAGE = 10;
export default class SpaceshipRepositoryImpl implements SpaceshipRepository {
  private readonly apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async search(
    cursor: string | null,
    searchTerm: string,
  ): Promise<SpaceshipSearchResult> {
    if (searchTerm === '') {
      return await this.paginate(cursor);
    }

    // since there no search endpoint, we need to fetch all and filter.
    return await this.filter(searchTerm);
  }

  private async filter(searchTerm: string) {
    const response = await this.apiClient.getAllSpaceships();
    const ships = response.data.allStarships.starships.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return {
      ships,
      hasMore: false,
      cursor: null,
    };
  }

  private async paginate(cursor: string | null) {
    const response = await this.apiClient.getSpaceships(ITEMS_PER_PAGE, cursor);
    return fromResponseToSearchSpaceshipResult(response);
  }
}
