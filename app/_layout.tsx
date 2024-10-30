import { Link, Stack } from 'expo-router';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import SpaceShipRepoMock from '@/integrations/mocks/SpaceShipRepoMock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StorageSpaceshipFavoriteRepositoryImpl from '@/integrations/favoriteSpaceShipRepo/StorageSpaceshipFavoriteRepositoryImpl';
import AsyncStorageServiceImpl from '@/integrations/favoriteSpaceShipRepo/StorageServiceImpl';

const spaceShipRepo = new SpaceShipRepoMock();
const spaceShipFavoriteRepo = new StorageSpaceshipFavoriteRepositoryImpl(
  new AsyncStorageServiceImpl(),
);
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <DepsProvider
        spaceShipRepo={spaceShipRepo}
        spaceShipFavoriteRepo={spaceShipFavoriteRepo}
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: 'Spaceships',
              headerRight: () => <Link href={'/favorite'}>Favorite</Link>,
            }}
          />
          <Stack.Screen name="favorite" options={{ title: 'Your Favorite' }} />
        </Stack>
      </DepsProvider>
    </QueryClientProvider>
  );
}
