import mockSpaceshipRepo from '@/domain/testUtils/mockSpaceshipRepo';
import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';
import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';
import { renderHook, waitFor } from '@testing-library/react-native';
import useSpaceships from '@/domain/queries/useSpaceships';
import {
  queryClient,
  reactQueryWrapper,
} from '@/domain/testUtils/reactQueryWrapper';

const spaceShipRepo: SpaceshipRepository = mockSpaceshipRepo();

const mockData: SpaceshipSearchResult = {
  ships: [
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
  ],
  hasMore: false,
};

describe('test useSpaceships', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test('should fetch spaceships successfully', async () => {
    spaceShipRepo.search = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useSpaceships(1, '', spaceShipRepo), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.data).toStrictEqual(mockData);
  });

  test('should handle error when fetch spaceships failed', async () => {
    const errorMessage = 'Failed to fetch starships';
    spaceShipRepo.search = jest.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSpaceships(1, '', spaceShipRepo), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error?.message).toBe(errorMessage);
  });
});
