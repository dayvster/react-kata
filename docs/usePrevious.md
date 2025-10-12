# usePrevious

Get the previous value of a prop or state in React.

## API
```ts
const prev = usePrevious(value, defaultValue?)
```
- `value`: The value to track.
- `defaultValue`: Initial value (optional).

## Usage
```tsx
import { usePrevious } from 'react-kata';

const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

// prevCount is the previous value of count
```

## Notes
- Returns the previous value after each render.
- Useful for comparing previous and current state or props.
