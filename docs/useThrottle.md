# useThrottle

Throttle a value or callback in React.

## API
```ts
const throttledValue = useThrottle(value, limit, defaultValue?)
```
- `value`: The value to throttle.
- `limit`: Number of milliseconds to wait before updating.
- `defaultValue`: Initial value (optional).

## Usage
```tsx
import { useThrottle } from 'react-kata';

const [input, setInput] = useState('');
const throttled = useThrottle(input, 500, '');

useEffect(() => {
  // throttled changes only every 500ms
}, [throttled]);
```

## Notes
- Returns the throttled value.
- Useful for scroll events, resize events, or any value that should not update too frequently.
