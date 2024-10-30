import SpaceShip from '@/domain/entities/SpaceShip';
import { render, screen } from '@testing-library/react-native';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/domain/testUtils/reactQueryWrapper';
import mockSpaceshipFavoriteRepo from '@/domain/testUtils/mockSpaceshipFavoriteRepo';
import SpaceshipFavoriteScreen from '@/ui/screens/SpaceshipFavoriteScreen';

jest.mock('@uidotdev/usehooks', () => ({
  useThrottle: jest.fn((value) => value),
}));

const ships: SpaceShip[] = [
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

const spaceShipFavoriteRepo = mockSpaceshipFavoriteRepo();

function renderComponent() {
  render(
    <DepsProvider spaceShipFavoriteRepo={spaceShipFavoriteRepo}>
      <QueryClientProvider client={queryClient}>
        <SpaceshipFavoriteScreen />
      </QueryClientProvider>
    </DepsProvider>,
  );
}

describe('Test spaceship favorite listing', () => {
  test('should render favorite spaceship list', async () => {
    spaceShipFavoriteRepo.listAll = jest.fn().mockResolvedValue(ships);
    renderComponent();
    expect(await screen.findByText('X-wing')).toBeOnTheScreen();
    expect(await screen.findByText('TIE Fighter')).toBeOnTheScreen();
  });
});
