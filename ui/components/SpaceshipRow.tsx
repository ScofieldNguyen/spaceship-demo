import { StyleSheet, Text, View } from 'react-native';
import SpaceShip from '@/domain/entities/SpaceShip';
import { memo } from 'react';
import { globalStyles } from '@/ui/styles';

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
  return (
    <View key={ship.id} testID={'spaceship-row'} style={styles.container}>
      <LabelRow label={'Name'} value={ship.name} />
      <LabelRow label={'Model'} value={ship.model} />
      <LabelRow label={'Crew'} value={ship.crew} />
      <LabelRow label={'Passengers'} value={ship.passengers} />
      <LabelRow label={'Consumables'} value={ship.consumables} />
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
