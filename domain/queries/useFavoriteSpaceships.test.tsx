import SpaceShip from '@/domain/entities/SpaceShip';
import mockSpaceshipFavoriteRepo from '@/domain/testUtils/mockSpaceshipFavoriteRepo';
import { renderHook, waitFor } from '@testing-library/react-native';
import useFavoriteSpaceships from '@/domain/queries/useFavoriteSpaceships';
import { reactQueryWrapper } from '@/domain/testUtils/reactQueryWrapper';

const spaceShipFavoriteRepository = mockSpaceshipFavoriteRepo();

describe('Test useFavoriteSpaceships', () => {
  test('Should return data', async () => {
    const spaceShips: SpaceShip[] = [
      {
        id: '1',
        name: 'X-wing',
        model: 'T-65 X-wing starfighter',
        crew: '10',
        passengers: '20',
        consumables: '2 months',
      },
      {
        id: '2',
        name: 'TIE Fighter',
        model: 'TIE/LN space superiority starfighter',
        crew: '10',
        passengers: '20',
        consumables: '2 months',
      },
    ];

    spaceShipFavoriteRepository.listAll = jest
      .fn()
      .mockResolvedValue(spaceShips);

    const { result } = renderHook(
      () => useFavoriteSpaceships(spaceShipFavoriteRepository),
      {
        wrapper: reactQueryWrapper,
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toStrictEqual(spaceShips);
  });

  test('Should handle error', async () => {
    const errorMessage = 'Something wrong happened';

    spaceShipFavoriteRepository.listAll = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(
      () => useFavoriteSpaceships(spaceShipFavoriteRepository),
      {
        wrapper: reactQueryWrapper,
      },
    );

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error?.message).toBe(errorMessage);
  });
});
