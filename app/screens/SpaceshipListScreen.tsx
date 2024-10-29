import { View, Text, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { useSpaceshipRepo } from '@/domain/depedencyContext/DepsContext';
import useSpaceships from '@/domain/queries/useSpaceships';

export default function SpaceshipListScreen() {
  const [searchKey, setSearchKey] = useState('');
  const spaceShipRepo = useSpaceshipRepo();

  const { isLoading, ships, hasNextPage, fetchNextPage } = useSpaceships(
    searchKey,
    spaceShipRepo,
  );

  const onEndReach = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage]);

  return (
    <View>
      {isLoading && <View testID={'loading'} />}
      <FlatList
        testID={'spaceship-list'}
        data={ships}
        renderItem={({ item: ship }) => {
          return (
            <View key={ship.id}>
              <Text>{ship.name}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
