import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { globalStyles } from '@/ui/styles';

const DEBOUNCE_TIMEOUT_MS = 500;
function SearchBox(props: { onSearch: (value: string) => void }) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const { onSearch } = props;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, DEBOUNCE_TIMEOUT_MS);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const onChangeText = useCallback((value: string) => setInputValue(value), []);

  return (
    <TextInput
      style={styles.container}
      placeholder="Search Spaceships"
      value={inputValue}
      onChangeText={onChangeText}
      clearButtonMode={'while-editing'}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.border,
    ...globalStyles.padding,
  },
});

export default SearchBox;
