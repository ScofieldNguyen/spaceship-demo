import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export default memo(ItemSeparator);

const styles = StyleSheet.create({
  separator: { height: 8 },
});
