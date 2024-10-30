import SpaceShip from '@/domain/entities/SpaceShip';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import SpaceshipRow from '@/ui/components/SpaceshipRow';
import mockSpaceshipFavoriteRepo from '@/domain/testUtils/mockSpaceshipFavoriteRepo';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/domain/testUtils/reactQueryWrapper';

const mockShip: SpaceShip = {
  id: '1',
  name: 'Millennium Falcon',
  model: 'YT-1300 light freighter',
  crew: '4',
  passengers: '6',
  consumables: '2 months',
};

const spaceShipFavoriteRepo = mockSpaceshipFavoriteRepo();

function renderComponent() {
  render(
    <QueryClientProvider client={queryClient}>
      <DepsProvider spaceShipFavoriteRepo={spaceShipFavoriteRepo}>
        <SpaceshipRow ship={mockShip} />
      </DepsProvider>
    </QueryClientProvider>,
  );
}

describe('test spaceship row', () => {
  it('renders spaceship details correctly', () => {
    renderComponent();

    // render data
    expect(screen.getByText('Name:')).toBeTruthy();
    expect(screen.getByText('Millennium Falcon')).toBeTruthy();
    expect(screen.getByText('Model:')).toBeTruthy();
    expect(screen.getByText('YT-1300 light freighter')).toBeTruthy();
    expect(screen.getByText('Crew:')).toBeTruthy();
    expect(screen.getByText('4')).toBeTruthy();
    expect(screen.getByText('Passengers:')).toBeTruthy();
    expect(screen.getByText('6')).toBeTruthy();
    expect(screen.getByText('Consumables:')).toBeTruthy();
    expect(screen.getByText('2 months')).toBeTruthy();
  });

  it('should render non-favorite spaceship', async () => {
    spaceShipFavoriteRepo.isFavorite = jest
      .fn()
      .mockImplementation(() => false);

    renderComponent();

    // favorite button
    await waitFor(() => expect(screen.queryByText('Favorite')).toBeTruthy());
  });

  it('should display favorite spaceship', async () => {
    spaceShipFavoriteRepo.isFavorite = jest.fn().mockImplementation(() => true);

    renderComponent();

    // favorite button
    await waitFor(() => expect(screen.queryByText('UnFavorite')).toBeTruthy());
  });

  it('when hit favorite button, favorite function should be called', async () => {
    spaceShipFavoriteRepo.isFavorite = jest
      .fn()
      .mockImplementation(() => false);

    const favoriteSpy = jest.spyOn(spaceShipFavoriteRepo, 'favorite');

    renderComponent();

    await waitFor(() => expect(screen.queryByText('Favorite')).toBeTruthy());

    // favorite button
    await userEvent.press(screen.getByText('Favorite'));

    expect(favoriteSpy).toHaveBeenCalledTimes(1);
  });

  it('when hit unfavorite button, remove function should be called', async () => {
    spaceShipFavoriteRepo.isFavorite = jest.fn().mockImplementation(() => true);

    const unFavorite = jest.spyOn(spaceShipFavoriteRepo, 'remove');

    renderComponent();

    await waitFor(() => expect(screen.queryByText('UnFavorite')).toBeTruthy());

    // favorite button
    await userEvent.press(screen.getByText('UnFavorite'));

    expect(unFavorite).toHaveBeenCalledTimes(1);
  });
});
