import mockSpaceshipRepo from '@/domain/testUtils/mockSpaceshipRepo';
import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';
import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';
import { act, renderHook, waitFor } from '@testing-library/react-native';
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
  cursor: '3',
};

const page1: SpaceshipSearchResult = {
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
  hasMore: true,
  cursor: '3',
};

const page2: SpaceshipSearchResult = {
  ships: [
    {
      id: '3',
      name: 'X-wing 3',
      model: 'T-65 X-wing starfighter 3',
      crew: '103',
      passengers: '203',
      consumables: '3 months',
    },
  ],
  hasMore: false,
  cursor: null,
};

describe('test useSpaceships', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  test('should fetch spaceships successfully', async () => {
    spaceShipRepo.search = jest.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useSpaceships('', spaceShipRepo), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(result.current.ships).toStrictEqual(mockData.ships);
  });

  test('should handle pagination', async () => {
    spaceShipRepo.search = jest
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2)
      .mockResolvedValueOnce({
        ships: [],
        hasMore: false,
        cursor: null,
      });

    const { result } = renderHook(() => useSpaceships('', spaceShipRepo), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    // first page
    expect(result.current.ships).toStrictEqual(page1.ships);

    // calling next page
    expect(result.current.hasNextPage).toBeTruthy();
    await result.current.fetchNextPage();

    // expect contain page 1 and 2
    await waitFor(() =>
      expect(result.current.ships).toStrictEqual([
        ...page1.ships,
        ...page2.ships,
      ]),
    );

    // has next page should be false
    expect(result.current.hasNextPage).toBeFalsy();
  });

  test('should handle error when fetch spaceships failed', async () => {
    const errorMessage = 'Failed to fetch starships';
    spaceShipRepo.search = jest.fn().mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSpaceships('', spaceShipRepo), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(result.current.error?.message).toBe(errorMessage);
  });
});
