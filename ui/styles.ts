import { StyleSheet } from 'react-native';
import { colors } from '@/ui/colors';

export const globalStyles = StyleSheet.create({
  // styles
  modal: {
    position: 'absolute',
    backgroundColor: colors.dimBackground,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  padding: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  border: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrayColor,
  },
  // text
  bold: {
    fontWeight: 'bold',
  },
  // flex
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
});
