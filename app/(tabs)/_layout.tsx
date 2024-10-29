import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Spaceships' }} />
      <Tabs.Screen name="favorite" options={{ title: 'Your Favorite' }} />
    </Tabs>
  );
}
