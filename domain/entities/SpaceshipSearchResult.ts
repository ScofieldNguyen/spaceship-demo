import SpaceShip from '@/domain/entities/SpaceShip';

export default interface SpaceshipSearchResult {
  ships: SpaceShip[];
  hasMore: boolean;
  cursor: string | null;
}
