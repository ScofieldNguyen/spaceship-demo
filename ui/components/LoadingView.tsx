import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '@/ui/colors';
import { globalStyles } from '@/ui/styles';

export default function LoadingView() {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator animating={true} size="large" color={colors.blue} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    ...globalStyles.modal,
    ...globalStyles.center,
  },
});
