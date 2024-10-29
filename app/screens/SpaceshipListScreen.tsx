import { FlatList, TextInput, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useSpaceshipRepo } from '@/domain/depedencyContext/DepsContext';
import useSpaceships from '@/domain/queries/useSpaceships';
import SpaceShip from '@/domain/entities/SpaceShip';
import SpaceshipRow from '@/app/components/SpaceshipRow';
import SearchBox from '@/app/components/SearchBox';

const ON_END_THRESHOLD = 0.5;
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

  const renderItem = useCallback(
    ({ item }: { item: SpaceShip }) => <SpaceshipRow ship={item} />,
    [],
  );

  const keyExtractor = useCallback((item: SpaceShip) => item.id.toString(), []);

  return (
    <View>
      {isLoading && <View testID={'loading'} />}
      <SearchBox onSearch={onSearch} />
      <FlatList
        testID={'spaceship-list'}
        data={ships}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReach}
        onEndReachedThreshold={ON_END_THRESHOLD}
      />
    </View>
  );
}
