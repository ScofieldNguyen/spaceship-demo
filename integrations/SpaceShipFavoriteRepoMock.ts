import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';
import SpaceShip from '@/domain/entities/SpaceShip';

export default class SpaceShipFavoriteRepoMock
  implements SpaceshipFavoriteRepository
{
  private spaceships: SpaceShip[];

  constructor() {
    this.spaceships = [];
  }

  isFavorite(id: string): boolean {
    return this.spaceships.some((s) => s.id === id);
  }

  favorite(spaceShip: SpaceShip): Promise<SpaceShip> {
    this.spaceships.push(spaceShip);
    return Promise.resolve(spaceShip);
  }

  listAll(): Promise<SpaceShip[]> {
    return Promise.resolve(this.spaceships);
  }

  remove(id: string): Promise<SpaceShip> {
    const index = this.spaceships.findIndex((s) => s.id === id);
    if (index === -1) {
      return Promise.reject(new Error('SpaceShip not found'));
    }
    const [removed] = this.spaceships.splice(index, 1);
    return Promise.resolve(removed);
  }
}
