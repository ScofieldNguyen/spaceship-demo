import ApiClient from '@/integrations/spaceshipRepo/ApiClient';
import GetSpaceshipResponse from '@/integrations/spaceshipRepo/response/GetSpaceshipResponse';
import SpaceshipRepositoryImpl, {
  ITEMS_PER_PAGE,
} from '@/integrations/spaceshipRepo/SpaceshipRepositoryImpl';
import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';

const initial_fetch: GetSpaceshipResponse = {
  data: {
    allStarships: {
      starships: [
        {
          id: 'c3RhcnNoaXBzOjI=',
          name: 'CR90 corvette',
          model: 'CR90 corvette',
          crew: '30-165',
          passengers: '600',
          consumables: '1 year',
        },
        {
          id: 'c3RhcnNoaXBzOjM=',
          name: 'Star Destroyer',
          model: 'Imperial I-class Star Destroyer',
          crew: '47,060',
          passengers: 'n/a',
          consumables: '2 years',
        },
      ],
      pageInfo: {
        endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
        hasNextPage: true,
      },
    },
  },
};

const initial_expected_result: SpaceshipSearchResult = {
  ships: [
    {
      id: 'c3RhcnNoaXBzOjI=',
      name: 'CR90 corvette',
      model: 'CR90 corvette',
      crew: '30-165',
      passengers: '600',
      consumables: '1 year',
    },
    {
      id: 'c3RhcnNoaXBzOjM=',
      name: 'Star Destroyer',
      model: 'Imperial I-class Star Destroyer',
      crew: '47,060',
      passengers: 'n/a',
      consumables: '2 years',
    },
  ],
  cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
  hasMore: true,
};

const last_fetch: GetSpaceshipResponse = {
  data: {
    allStarships: {
      starships: [
        {
          id: 'c3RhcnNoaXBzOjI=',
          name: 'CR90 corvette',
          model: 'CR90 corvette',
          crew: '30-165',
          passengers: '600',
          consumables: '1 year',
        },
        {
          id: 'c3RhcnNoaXBzOjM=',
          name: 'Star Destroyer',
          model: 'Imperial I-class Star Destroyer',
          crew: '47,060',
          passengers: 'n/a',
          consumables: '2 years',
        },
      ],
      pageInfo: {
        endCursor: 'YXJyYXljb25uZWN0aW9uOjM1',
        hasNextPage: false,
      },
    },
  },
};

const last_expected_result: SpaceshipSearchResult = {
  ships: [
    {
      id: 'c3RhcnNoaXBzOjI=',
      name: 'CR90 corvette',
      model: 'CR90 corvette',
      crew: '30-165',
      passengers: '600',
      consumables: '1 year',
    },
    {
      id: 'c3RhcnNoaXBzOjM=',
      name: 'Star Destroyer',
      model: 'Imperial I-class Star Destroyer',
      crew: '47,060',
      passengers: 'n/a',
      consumables: '2 years',
    },
  ],
  cursor: 'YXJyYXljb25uZWN0aW9uOjM1',
  hasMore: false,
};

const search_load: GetSpaceshipResponse = {
  data: {
    allStarships: {
      starships: [
        {
          id: 'c3RhcnNoaXBzOjc0',
          name: 'Belbullab-22 starfighter',
          model: 'Belbullab-22 starfighter',
          crew: '1',
          passengers: '0',
          consumables: '7 days',
        },
        {
          id: 'c3RhcnNoaXBzOjc1',
          name: 'V-wing',
          model: 'Alpha-3 Nimbus-class V-wing starfighter',
          crew: '1',
          passengers: '0',
          consumables: '15 hours',
        },
      ],
      pageInfo: {
        endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
        hasNextPage: false,
      },
    },
  },
};

const search_expected_result: SpaceshipSearchResult = {
  ships: [
    {
      id: 'c3RhcnNoaXBzOjc1',
      name: 'V-wing',
      model: 'Alpha-3 Nimbus-class V-wing starfighter',
      crew: '1',
      passengers: '0',
      consumables: '15 hours',
    },
  ],
  cursor: null,
  hasMore: false,
};

describe('Test SpaceshipRepositoryImpl', () => {
  test('initial load', async () => {
    const apiClient: ApiClient = {
      getSpaceships: jest.fn().mockResolvedValue(initial_fetch),
      getAllSpaceships: jest.fn(),
    };

    const spaceshipRepository = new SpaceshipRepositoryImpl(apiClient);

    const result = await spaceshipRepository.search(null, '');

    expect(result).toStrictEqual(initial_expected_result);
    expect(apiClient.getSpaceships).toHaveBeenCalledWith(ITEMS_PER_PAGE, null);
  });

  test('last load', async () => {
    const apiClient: ApiClient = {
      getSpaceships: jest.fn().mockResolvedValue(last_fetch),
      getAllSpaceships: jest.fn(),
    };

    const spaceshipRepository = new SpaceshipRepositoryImpl(apiClient);

    const cursor = 'YXJyYXljb25uZWN0aW9uOjE=';
    const result = await spaceshipRepository.search(cursor, '');

    expect(result).toStrictEqual(last_expected_result);
    expect(apiClient.getSpaceships).toHaveBeenCalledWith(
      ITEMS_PER_PAGE,
      cursor,
    );
  });

  test('search with search term', async () => {
    const apiClient: ApiClient = {
      getSpaceships: jest.fn(),
      getAllSpaceships: jest.fn().mockResolvedValueOnce(search_load),
    };

    const spaceshipRepository = new SpaceshipRepositoryImpl(apiClient);

    const result = await spaceshipRepository.search(null, 'V-w');

    expect(result).toStrictEqual(search_expected_result);

    expect(apiClient.getAllSpaceships).toHaveBeenCalled();
  });
});
