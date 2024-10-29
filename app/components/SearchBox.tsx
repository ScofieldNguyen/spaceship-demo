import { memo, useCallback, useEffect, useState } from 'react';
import { TextInput } from 'react-native';

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
    if (debouncedValue) {
      onSearch(debouncedValue); // Trigger search with debounced value
    }
  }, [debouncedValue, onSearch]);

  const onChangeText = useCallback((value: string) => setInputValue(value), []);

  return (
    <TextInput
      placeholder="Search Spaceships"
      value={inputValue}
      onChangeText={onChangeText}
    />
  );
}

export default memo(SearchBox);
