# useDebounce

Debounce a value or callback in React.

## API
```ts
const debouncedValue = useDebounce(value, delay?, defaultValue?)
```
- `value`: The value to debounce.
- `delay`: Number of milliseconds to wait before updating (default: 400).
- `defaultValue`: Initial value (optional).

## Usage
```tsx
import { useDebounce } from 'react-kata';

const [input, setInput] = useState('');
const debounced = useDebounce(input, 300, '');

useEffect(() => {
  // debounced changes only after 300ms
}, [debounced]);
```

## Notes
- Returns the debounced value.
- Useful for search inputs, API calls, or any value that should not update immediately.
