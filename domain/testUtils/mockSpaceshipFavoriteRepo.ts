import SpaceshipFavoriteRepository from '@/domain/repositories/SpaceshipFavoriteRepository';

export default function mockSpaceshipFavoriteRepo(): SpaceshipFavoriteRepository {
  return {
    listAll: jest.fn(),
    favorite: jest.fn(),
    remove: jest.fn(),
    isFavorite: jest.fn(),
  };
}
