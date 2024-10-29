import { View, Text, FlatList, TextInput } from 'react-native';
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

  const onSearch = useCallback((text: string) => setSearchKey(text), []);

  const onEndReach = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage]);

  return (
    <View>
      {isLoading && <View testID={'loading'} />}
      <TextInput
        placeholder="Search Spaceships"
        value={searchKey}
        onChangeText={onSearch}
      />
      <FlatList
        testID={'spaceship-list'}
        data={ships}
        renderItem={({ item: ship }) => {
          return (
            <View key={ship.id} testID={'spaceship-row'}>
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
