import SpaceShip from '@/domain/entities/SpaceShip';
import mockSpaceshipFavoriteRepo from '@/domain/testUtils/mockSpaceshipFavoriteRepo';
import { renderHook, waitFor } from '@testing-library/react-native';
import {
  queryClient,
  reactQueryWrapper,
} from '@/domain/testUtils/reactQueryWrapper';
import useIsFavoriteSpaceship from '@/domain/queries/useIsFavoriteSpaceShip';

const spaceShipFavoriteRepository = mockSpaceshipFavoriteRepo();

const mockShip: SpaceShip = {
  id: '1',
  name: 'Millennium Falcon',
  model: 'YT-1300 light freighter',
  crew: '4',
  passengers: '6',
  consumables: '2 months',
};

describe('test useIsFavoriteSpaceship', () => {
  beforeEach(() => {
    queryClient.clear();
  });
  it('returns true when spaceship is a favorite', async () => {
    spaceShipFavoriteRepository.isFavorite = jest
      .fn()
      .mockImplementation(() => true);
    const { result } = renderHook(
      () => useIsFavoriteSpaceship(mockShip, spaceShipFavoriteRepository),
      { wrapper: reactQueryWrapper },
    );
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toBe(true);
  });

  it('returns false when spaceship is not a favorite', async () => {
    spaceShipFavoriteRepository.isFavorite = jest
      .fn()
      .mockImplementation(() => false);
    const { result } = renderHook(
      () => useIsFavoriteSpaceship(mockShip, spaceShipFavoriteRepository),
      { wrapper: reactQueryWrapper },
    );
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toBe(false);
  });
});
