import GetSpaceshipResponse, {
  fromResponseToSearchSpaceshipResult,
} from '@/integrations/spaceshipRepo/response/GetSpaceshipResponse';
import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';

describe('test converting GetSpaceshipResponse to SpaceshipSearchResult', () => {
  test('has more page - should convert correctly', () => {
    const response: GetSpaceshipResponse = {
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

    const expectedResult: SpaceshipSearchResult = {
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

    const result = fromResponseToSearchSpaceshipResult(response);

    expect(result).toStrictEqual(expectedResult);
  });

  test('the end of data - should convert correctly', () => {
    const response: GetSpaceshipResponse = {
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

    const expectedResult: SpaceshipSearchResult = {
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

    const result = fromResponseToSearchSpaceshipResult(response);

    expect(result).toStrictEqual(expectedResult);
  });
});
