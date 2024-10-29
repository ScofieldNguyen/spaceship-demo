import SpaceShip from '@/domain/entities/SpaceShip';

export default interface SpaceshipFavoriteRepository {
  // list all favorite spaceships
  listAll: () => Promise<SpaceShip[]>;

  // favorite a spaceship
  favorite: (spaceShip: SpaceShip) => Promise<SpaceShip>;

  // unfavorite a spaceship
  remove: () => Promise<void>;
}
