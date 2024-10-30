import StorageSpaceshipFavoriteRepositoryImpl from '@/integrations/favoriteSpaceShipRepo/StorageSpaceshipFavoriteRepositoryImpl';
import StorageService from '@/integrations/favoriteSpaceShipRepo/StorageService';
import SpaceShip from '@/domain/entities/SpaceShip';

const storageService: StorageService = {
  load: jest.fn(),
  save: jest.fn(),
};

const mockData: SpaceShip[] = [
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

describe('test storage spaceship favorite repository', () => {
  test('list all favorite spaceship', async () => {
    storageService.load = jest
      .fn()
      .mockResolvedValueOnce(JSON.stringify(mockData));

    const storage = new StorageSpaceshipFavoriteRepositoryImpl(storageService);
    const spaceships = await storage.listAll();
    expect(spaceships).toStrictEqual(mockData);
  });

  test('call list all two times should be cached', async () => {
    storageService.load = jest.fn().mockResolvedValue(JSON.stringify(mockData));

    const storage = new StorageSpaceshipFavoriteRepositoryImpl(storageService);

    // call first time
    const spaceships = await storage.listAll();
    expect(spaceships).toStrictEqual(mockData);

    // call second times
    const spaceshipsSecondTime = await storage.listAll();
    expect(spaceshipsSecondTime).toStrictEqual(mockData);

    // load should be called only one time
    expect(storageService.load).toHaveBeenCalledTimes(1);
  });

  test('if there is error when parsing data, should return empty array', async () => {
    // prepare error data in storage
    let data = JSON.stringify(mockData);
    data += 'error';
    storageService.load = jest.fn().mockResolvedValue(data);

    const storage = new StorageSpaceshipFavoriteRepositoryImpl(storageService);

    // should auto recover from error
    const spaceships = await storage.listAll();
    expect(spaceships).toStrictEqual([]);
  });

  test('should return true if spaceship is favorite', async () => {
    storageService.load = jest.fn().mockResolvedValue(JSON.stringify(mockData));
    const storage = new StorageSpaceshipFavoriteRepositoryImpl(storageService);
    expect(storage.isFavorite('1')).toBeTruthy();
  });

  test('add favorite spaceship', async () => {
    storageService.load = jest.fn().mockResolvedValue(JSON.stringify(mockData));
    const storage = new StorageSpaceshipFavoriteRepositoryImpl(storageService);
    const spaceShip: SpaceShip = {
      id: '3',
      name: 'X-wing 3',
      model: 'T-65 X-wing starfighter 3',
      crew: '103',
      passengers: '203',
      consumables: '2 months',
    };
    await storage.favorite(spaceShip);

    const spaceships = await storage.listAll();
    expect(spaceships).toStrictEqual([...mockData, spaceShip]);

    // save should be called
    expect(storageService.save).toHaveBeenCalledWith(
      'favoriteSpaceships',
      JSON.stringify([...mockData, spaceShip]),
    );
  });

  test('add favorite duplicate', async () => {
    storageService.load = jest.fn().mockResolvedValue(JSON.stringify(mockData));
    storageService.save = jest.fn();

    const storage = new StorageSpaceshipFavoriteRepositoryImpl(storageService);

    // duplicate spaceship
    const spaceShip: SpaceShip = {
      id: '1',
      name: 'X-wing',
      model: 'T-65 X-wing starfighter',
      crew: '10',
      passengers: '20',
      consumables: '2 months',
    };
    await storage.favorite(spaceShip);

    const spaceships = await storage.listAll();

    // data should stay the same
    expect(spaceships).toStrictEqual(mockData);

    // save should not be called
    expect(storageService.save).not.toHaveBeenCalled();
  });

  test('remove favorite spaceship', async () => {
    storageService.load = jest.fn().mockResolvedValue(JSON.stringify(mockData));
    const storage = new StorageSpaceshipFavoriteRepositoryImpl(storageService);
    await storage.remove('1');

    const spaceships = await storage.listAll();
    const expectedData = [
      {
        id: '2',
        name: 'TIE Fighter',
        model: 'TIE/LN space superiority starfighter',
        crew: '10',
        passengers: '20',
        consumables: '2 months',
      },
    ];
    expect(spaceships).toStrictEqual(expectedData);

    // save should be called
    expect(storageService.save).toHaveBeenCalledWith(
      'favoriteSpaceships',
      JSON.stringify(expectedData),
    );
  });
});
