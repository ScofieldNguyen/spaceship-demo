import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { colors } from '@/ui/colors';

function ErrorPage({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error</Text>
      <Text style={styles.messageText}>{message}</Text>
      <Button title="Retry" onPress={onRetry} color={colors.blue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ErrorPage;
