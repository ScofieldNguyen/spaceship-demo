import SpaceShip from '@/domain/entities/SpaceShip';

export default interface SpaceshipFavoriteRepository {
  // list all favorite spaceships
  listAll: () => Promise<SpaceShip[]>;

  // favorite a spaceship
  favorite: (spaceShip: SpaceShip) => Promise<SpaceShip>;

  // unfavorite a spaceship
  remove: (id: string) => Promise<SpaceShip>;

  // check if a spaceship is favorited => should be fast and unreliable on network
  isFavorite: (id: string) => boolean;
}
