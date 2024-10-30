import mockSpaceshipFavoriteRepo from '@/domain/testUtils/mockSpaceshipFavoriteRepo';
import { renderHook } from '@testing-library/react-native';
import {
  queryClient,
  reactQueryWrapper,
} from '@/domain/testUtils/reactQueryWrapper';
import SpaceShip from '@/domain/entities/SpaceShip';
import { useUnFavoriteSpaceshipMutation } from '@/domain/mutations/useUnFavoriteSpaceshipMutation';

const spaceShipFavoriteRepo = mockSpaceshipFavoriteRepo();

describe('Test useFavoriteSpaceshipMutation', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test('Should call unfavorite function', async () => {
    const ship: SpaceShip = {
      id: '1',
      name: 'X-wing',
      model: 'T-65 X-wing starfighter',
      crew: '10',
      passengers: '20',
      consumables: '2 months',
    };

    spaceShipFavoriteRepo.remove = jest.fn().mockResolvedValue(ship);

    const { result } = renderHook(
      () => useUnFavoriteSpaceshipMutation(spaceShipFavoriteRepo),
      {
        wrapper: reactQueryWrapper,
      },
    );

    await result.current.mutateAsync(ship);

    expect(spaceShipFavoriteRepo.remove).toHaveBeenCalledWith(ship.id);
  });
});
