import { Link, Stack } from 'expo-router';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StorageSpaceshipFavoriteRepositoryImpl from '@/integrations/favoriteRepo/StorageSpaceshipFavoriteRepositoryImpl';
import AsyncStorageServiceImpl from '@/integrations/favoriteRepo/StorageServiceImpl';
import SpaceshipRepositoryImpl from '@/integrations/spaceshipRepo/SpaceshipRepositoryImpl';
import GraphAPIClient from '@/integrations/spaceshipRepo/GraphAPIClient';

// uncomment these lines to use mock versions of the repository
// const spaceShipRepo = new SpaceShipRepoMock();
// const spaceShipFavoriteRepo = new SpaceShipFavoriteRepoMock();

const spaceShipRepo = new SpaceshipRepositoryImpl(
  new GraphAPIClient(process.env.EXPO_PUBLIC_API_ENDPOINT || ''),
);
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
