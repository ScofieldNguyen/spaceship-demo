import { StyleSheet, Text } from 'react-native';
import { globalStyles } from '@/ui/styles';
import { colors } from '@/ui/colors';
import { memo } from 'react';

function EmptyList() {
  return <Text style={styles.emptyList}>No items yet</Text>;
}

export default memo(EmptyList);

const styles = StyleSheet.create({
  emptyList: {
    textAlign: 'center',
    color: colors.lightGrayColor,
    ...globalStyles.padding,
  },
});
