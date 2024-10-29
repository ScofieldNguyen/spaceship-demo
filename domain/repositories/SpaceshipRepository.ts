import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';

export default interface SpaceshipRepository {
  // search spaceship by name with pagination
  search: (
    cursor: string | null,
    searchTerm: string,
  ) => Promise<SpaceshipSearchResult>;
}
