import { FlatList, StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import { useSpaceshipFavoriteRepo } from '@/domain/depedencyContext/DepsContext';
import useFavoriteSpaceships from '@/domain/queries/useFavoriteSpaceships';
import { globalStyles } from '@/ui/styles';
import LoadingView from '@/ui/components/LoadingView';
import { useThrottle } from '@uidotdev/usehooks';
import SpaceShip from '@/domain/entities/SpaceShip';
import SpaceshipRow from '@/ui/components/SpaceshipRow';
import ItemSeparator from '@/ui/components/ItemSeparator';
import EmptyList from '@/ui/components/EmptyList';

function SpaceshipFavoriteScreen() {
  const spaceshipFavoriteRepo = useSpaceshipFavoriteRepo();
  const { isLoading, error, data } = useFavoriteSpaceships(
    spaceshipFavoriteRepo,
  );
  const ships = data || [];

  // prevent flickering
  const loading = useThrottle(isLoading, 300);

  const renderItem = useCallback(
    ({ item }: { item: SpaceShip }) => <SpaceshipRow ship={item} />,
    [],
  );

  const keyExtractor = useCallback((item: SpaceShip) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      {loading && <LoadingView />}
      <FlatList
        testID={'spaceship-list'}
        data={ships}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...globalStyles.padding, flex: 1, rowGap: 12 },
});

export default SpaceshipFavoriteScreen;
