import mockSpaceshipFavoriteRepo from '@/domain/testUtils/mockSpaceshipFavoriteRepo';
import { renderHook } from '@testing-library/react-native';
import { useFavoriteSpaceshipMutation } from '@/domain/mutations/useFavoriteSpaceshipMutation';
import {
  queryClient,
  reactQueryWrapper,
} from '@/domain/testUtils/reactQueryWrapper';
import SpaceShip from '@/domain/entities/SpaceShip';

const spaceShipFavoriteRepo = mockSpaceshipFavoriteRepo();

describe('Test useFavoriteSpaceshipMutation', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test('Should call favorite function', async () => {
    const ship: SpaceShip = {
      id: '1',
      name: 'X-wing',
      model: 'T-65 X-wing starfighter',
      crew: '10',
      passengers: '20',
      consumables: '2 months',
    };

    spaceShipFavoriteRepo.favorite = jest.fn();

    const { result } = renderHook(
      () => useFavoriteSpaceshipMutation(spaceShipFavoriteRepo),
      {
        wrapper: reactQueryWrapper,
      },
    );

    await result.current.mutateAsync(ship);

    expect(spaceShipFavoriteRepo.favorite).toHaveBeenCalledWith(ship);
  });
});
