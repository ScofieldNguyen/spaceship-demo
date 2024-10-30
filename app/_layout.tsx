import { Link, Stack } from 'expo-router';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import SpaceShipRepoMock from '@/integrations/SpaceShipRepoMock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SpaceShipFavoriteRepoMock from '@/integrations/SpaceShipFavoriteRepoMock';

const spaceShipRepo = new SpaceShipRepoMock();
const spaceShipFavoriteRepo = new SpaceShipFavoriteRepoMock();
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
