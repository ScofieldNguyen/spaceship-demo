import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';
import mockSpaceshipRepo from '@/domain/testUtils/mockSpaceshipRepo';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import SpaceshipListScreen from '@/ui/screens/SpaceshipListScreen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/domain/testUtils/reactQueryWrapper';

jest.mock('@uidotdev/usehooks', () => ({
  useThrottle: jest.fn((value) => value),
}));

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

const spaceShipRepo = mockSpaceshipRepo();

async function scrollFlatListToTheEnd() {
  await act(() => {
    fireEvent(screen.getByTestId('spaceship-list'), 'onEndReached');
  });
}

function renderComponent() {
  render(
    <DepsProvider spaceShipRepo={spaceShipRepo}>
      <QueryClientProvider client={queryClient}>
        <SpaceshipListScreen />
      </QueryClientProvider>
    </DepsProvider>,
  );
}

describe('Testing Spaceship List Screen', () => {
  beforeEach(() => {
    queryClient.clear();
  });
  it('Should render 10 items first and fetch more data when reach the end', async () => {
    spaceShipRepo.search = jest
      .fn()
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2)
      .mockResolvedValueOnce({
        ships: [],
        hasMore: false,
        cursor: null,
      });

    renderComponent();

    // wait until loading finished
    expect(expect(screen.getByTestId('loading')).toBeOnTheScreen());
    await waitFor(() =>
      expect(screen.queryByTestId('loading')).not.toBeOnTheScreen(),
    );

    // now should display data in first page
    expect(screen.getByText(page1.ships[0].name)).toBeOnTheScreen();
    expect(screen.getByText(page1.ships[1].name)).toBeOnTheScreen();
    expect(screen.queryByTestId(page2.ships[0].name)).not.toBeOnTheScreen();

    // reach the end of the page
    await scrollFlatListToTheEnd();

    // wait until the second page is loaded
    await waitFor(() =>
      expect(screen.queryAllByTestId('spaceship-row')).toHaveLength(
        page1.ships.length + page2.ships.length,
      ),
    );

    // now should display data in 2 pages
    expect(screen.getByText(page1.ships[0].name)).toBeOnTheScreen();
    expect(screen.getByText(page1.ships[1].name)).toBeOnTheScreen();
    expect(screen.getByText(page2.ships[0].name)).toBeOnTheScreen();
  });

  test('search feature', async () => {
    const searchKeyWord = 'search keyword';
    spaceShipRepo.search = jest
      .fn()
      .mockImplementation((cursor: string | null, searchTerm: string) => {
        if (searchTerm) {
          return Promise.resolve(page2);
        }
        return Promise.resolve(page1);
      });

    renderComponent();

    // wait until loading finished
    expect(expect(screen.getByTestId('loading')).toBeOnTheScreen());
    await waitFor(() =>
      expect(screen.queryByTestId('loading')).not.toBeOnTheScreen(),
    );

    // search
    fireEvent.changeText(
      screen.getByPlaceholderText('Search Spaceships'),
      searchKeyWord,
    );

    // wait until fetch function be called again
    await waitFor(() => expect(spaceShipRepo.search).toHaveBeenCalledTimes(2));

    // fetch function should be call with search params
    expect(spaceShipRepo.search).toHaveBeenLastCalledWith(
      undefined,
      searchKeyWord,
    );

    // display search result
    await waitFor(() =>
      expect(screen.getByText(page2.ships[0].name)).toBeOnTheScreen(),
    );
  });
});
