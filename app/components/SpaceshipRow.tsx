import { Text, View } from 'react-native';
import SpaceShip from '@/domain/entities/SpaceShip';
import { memo } from 'react';

function SpaceshipRow(props: { ship: SpaceShip }) {
  const { ship } = props;
  return (
    <View key={ship.id} testID={'spaceship-row'}>
      <Text>{ship.name}</Text>
    </View>
  );
}

export default memo(SpaceshipRow);
