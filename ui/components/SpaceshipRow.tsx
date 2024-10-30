import { Button, StyleSheet, Text, View } from 'react-native';
import SpaceShip from '@/domain/entities/SpaceShip';
import { memo, useCallback } from 'react';
import { globalStyles } from '@/ui/styles';
import { useSpaceshipFavoriteRepo } from '@/domain/depedencyContext/DepsContext';
import { useFavoriteSpaceshipMutation } from '@/domain/mutations/useFavoriteSpaceshipMutation';
import { useUnFavoriteSpaceshipMutation } from '@/domain/mutations/useUnFavoriteSpaceshipMutation';
import useIsFavoriteSpaceship from '@/domain/queries/useIsFavoriteSpaceShip';

function LabelRow(props: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{props.label}:</Text>
      <Text>{props.value}</Text>
    </View>
  );
}

function SpaceshipRow(props: { ship: SpaceShip }) {
  const { ship } = props;
  const spaceShipFavoriteRepo = useSpaceshipFavoriteRepo();
  const { mutate: favoriteMutation } = useFavoriteSpaceshipMutation(
    spaceShipFavoriteRepo!,
  );
  const { mutate: unFavoriteMutation } = useUnFavoriteSpaceshipMutation(
    spaceShipFavoriteRepo!,
  );

  const { data: isFavorite } = useIsFavoriteSpaceship(
    ship,
    spaceShipFavoriteRepo!,
  );

  const onFavorite = useCallback(() => favoriteMutation(ship), []);
  const onUnFavorite = useCallback(() => unFavoriteMutation(ship), []);

  return (
    <View key={ship.id} testID={'spaceship-row'} style={styles.container}>
      <LabelRow label={'Name'} value={ship.name} />
      <LabelRow label={'Model'} value={ship.model} />
      <LabelRow label={'Crew'} value={ship.crew} />
      <LabelRow label={'Passengers'} value={ship.passengers} />
      <LabelRow label={'Consumables'} value={ship.consumables} />

      {isFavorite ? (
        <Button title={'UnFavorite'} onPress={onUnFavorite} />
      ) : (
        <Button title={'Favorite'} onPress={onFavorite} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.padding,
    ...globalStyles.border,
  },
  row: {
    ...globalStyles.flexRow,
    gap: 8,
  },
  label: {
    ...globalStyles.bold,
  },
});

export default memo(SpaceshipRow);
