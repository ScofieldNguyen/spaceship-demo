import { Stack } from 'expo-router';
import DepsProvider from '@/domain/depedencyContext/DepsContext';
import SpaceShipRepoMock from '@/integrations/SpaceShipRepoMock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const spaceShipRepo = new SpaceShipRepoMock();
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <DepsProvider spaceShipRepo={spaceShipRepo}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DepsProvider>
    </QueryClientProvider>
  );
}
