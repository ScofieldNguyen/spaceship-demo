import SpaceshipSearchResult from '@/domain/entities/SpaceshipSearchResult';
import mockSpaceshipRepo from '@/domain/testUtils/mockSpaceshipRepo';
import {
  render,
  waitFor,
  screen,
  act,
  fireEvent,
} from '@testing-library/react-native';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import SpaceshipListScreen from '@/app/screens/SpaceshipListScreen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/domain/testUtils/reactQueryWrapper';

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

    // wait until loading finished
    await waitFor(() =>
      expect(screen.queryByTestId('loading')).not.toBeOnTheScreen(),
    );

    // now should display data in 2 pages
    expect(screen.getByText(page1.ships[0].name)).toBeOnTheScreen();
    expect(screen.getByText(page1.ships[1].name)).toBeOnTheScreen();
    expect(screen.getByText(page2.ships[0].name)).toBeOnTheScreen();
  });
});
