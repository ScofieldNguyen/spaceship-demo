import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';

export default interface SpaceshipRepository {
  // search spaceship by name with pagination
  search: (page: number, searchTerm: string) => Promise<SpaceshipSearchResult>;
}
