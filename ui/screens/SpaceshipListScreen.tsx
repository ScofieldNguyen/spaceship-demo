import { FlatList, StyleSheet, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useSpaceshipRepo } from '@/domain/depedencyContext/DepsContext';
import useSpaceships from '@/domain/queries/useSpaceships';
import SpaceShip from '@/domain/entities/SpaceShip';
import SpaceshipRow from '@/ui/components/SpaceshipRow';
import SearchBox from '@/ui/components/SearchBox';
import { globalStyles } from '@/ui/styles';
import { useThrottle } from '@uidotdev/usehooks';
import LoadingView from '@/ui/components/LoadingView';
import ErrorPage from '@/ui/components/ErrorPage';

const ON_END_THRESHOLD = 0.5;
function ItemSeparator() {
  return <View style={styles.separator} />;
}

export default function SpaceshipListScreen() {
  const [searchKey, setSearchKey] = useState('');
  const spaceShipRepo = useSpaceshipRepo();

  const { isLoading, ships, hasNextPage, fetchNextPage, error, refetch } =
    useSpaceships(searchKey, spaceShipRepo);

  // prevent flickering
  const loading = useThrottle(isLoading, 300);

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
    <View style={styles.container}>
      {loading && <LoadingView />}
      <SearchBox onSearch={onSearch} />

      {error && <ErrorPage message={error.message} onRetry={refetch} />}

      <FlatList
        testID={'spaceship-list'}
        data={ships}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReach}
        onEndReachedThreshold={ON_END_THRESHOLD}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...globalStyles.padding, flex: 1, rowGap: 12 },
  separator: { height: 8 },
});
