import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';

export default function mockSpaceshipRepo(): SpaceshipRepository {
  return {
    search: jest.fn(),
  };
}
