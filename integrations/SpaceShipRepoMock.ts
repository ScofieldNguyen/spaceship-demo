import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';
import SpaceshipRepository from '@/domain/repositories/SpaceshipRepository';
import SpaceShip from '@/domain/entities/SpaceShip';

export default class SpaceShipRepoMock implements SpaceshipRepository {
  private readonly spaceships: SpaceShip[];
  private readonly PAGE_SIZE = 10;

  constructor() {
    this.spaceships = [
      {
        id: '1',
        name: 'Explorer',
        model: 'X-1',
        crew: '4',
        passengers: '10',
        consumables: '6 months',
      },
      {
        id: '2',
        name: 'Galactic Cruiser',
        model: 'G-2',
        crew: '5',
        passengers: '20',
        consumables: '1 year',
      },
      {
        id: '3',
        name: 'Star Voyager',
        model: 'S-3',
        crew: '3',
        passengers: '5',
        consumables: '3 months',
      },
      {
        id: '4',
        name: 'Interstellar',
        model: 'I-4',
        crew: '10',
        passengers: '50',
        consumables: '2 years',
      },
      {
        id: '5',
        name: 'Astro Scout',
        model: 'A-5',
        crew: '2',
        passengers: '3',
        consumables: '1 month',
      },
      {
        id: '6',
        name: 'Cosmos Runner',
        model: 'C-6',
        crew: '4',
        passengers: '12',
        consumables: '8 months',
      },
      {
        id: '7',
        name: 'Nebula Hunter',
        model: 'N-7',
        crew: '6',
        passengers: '15',
        consumables: '10 months',
      },
      {
        id: '8',
        name: 'Meteor Rider',
        model: 'M-8',
        crew: '2',
        passengers: '2',
        consumables: '15 days',
      },
      {
        id: '9',
        name: 'Planet Explorer',
        model: 'P-9',
        crew: '7',
        passengers: '30',
        consumables: '1.5 years',
      },
      {
        id: '10',
        name: 'Solar Wind',
        model: 'SW-10',
        crew: '3',
        passengers: '8',
        consumables: '4 months',
      },
      {
        id: '11',
        name: 'Comet Chaser',
        model: 'CC-11',
        crew: '4',
        passengers: '12',
        consumables: '9 months',
      },
      {
        id: '12',
        name: 'Star Gazer',
        model: 'SG-12',
        crew: '5',
        passengers: '18',
        consumables: '1 year',
      },
      {
        id: '13',
        name: 'Galaxy Runner',
        model: 'GR-13',
        crew: '6',
        passengers: '25',
        consumables: '2 years',
      },
      {
        id: '14',
        name: 'Void Walker',
        model: 'VW-14',
        crew: '2',
        passengers: '5',
        consumables: '2 months',
      },
      {
        id: '15',
        name: 'Quantum Scout',
        model: 'QS-15',
        crew: '3',
        passengers: '7',
        consumables: '3 months',
      },
      {
        id: '16',
        name: 'Cosmic Pioneer',
        model: 'CP-16',
        crew: '8',
        passengers: '40',
        consumables: '1 year',
      },
      {
        id: '17',
        name: 'Eclipse Voyager',
        model: 'EV-17',
        crew: '5',
        passengers: '20',
        consumables: '6 months',
      },
      {
        id: '18',
        name: 'Asteroid Seeker',
        model: 'AS-18',
        crew: '3',
        passengers: '10',
        consumables: '4 months',
      },
      {
        id: '19',
        name: 'Black Hole Scout',
        model: 'BHS-19',
        crew: '2',
        passengers: '6',
        consumables: '2 weeks',
      },
      {
        id: '20',
        name: 'Celestial Wanderer',
        model: 'CW-20',
        crew: '9',
        passengers: '30',
        consumables: '1.5 years',
      },
      {
        id: '21',
        name: 'Nova Glider',
        model: 'NG-21',
        crew: '4',
        passengers: '15',
        consumables: '8 months',
      },
      {
        id: '22',
        name: 'Orbit Runner',
        model: 'OR-22',
        crew: '5',
        passengers: '25',
        consumables: '1 year',
      },
      {
        id: '23',
        name: 'Starlight Rider',
        model: 'SR-23',
        crew: '3',
        passengers: '10',
        consumables: '3 months',
      },
      {
        id: '24',
        name: 'Space Drifter',
        model: 'SD-24',
        crew: '2',
        passengers: '4',
        consumables: '1 month',
      },
      {
        id: '25',
        name: 'Nebula Explorer',
        model: 'NE-25',
        crew: '7',
        passengers: '35',
        consumables: '2 years',
      },
    ];
  }

  async search(
    cursor: string | null,
    searchTerm: string,
  ): Promise<SpaceshipSearchResult> {
    let filteredShips = this.filter(searchTerm);

    const paginatedShips = this.paginate(cursor, filteredShips);

    const nextCursor = this.getNextCursor(paginatedShips);

    // Uncomment this to test error handling
    // if (Math.random() < 0.6) {
    //   throw new Error('Random error occurred');
    // }

    return {
      ships: paginatedShips,
      hasMore: nextCursor !== null,
      cursor: nextCursor,
    };
  }

  private filter(searchTerm: string): SpaceShip[] {
    if (searchTerm === '') {
      return this.spaceships;
    }

    return this.spaceships.filter((ship) =>
      ship.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  private paginate(cursor: string | null, ships: SpaceShip[]): SpaceShip[] {
    const startIndex = cursor
      ? ships.findIndex((ship) => ship.id === cursor) + 1
      : 0;
    return ships.slice(startIndex, startIndex + this.PAGE_SIZE);
  }

  private getNextCursor(paginatedShips: SpaceShip[]) {
    return paginatedShips.length === this.PAGE_SIZE
      ? paginatedShips[paginatedShips.length - 1].id
      : null;
  }
}
