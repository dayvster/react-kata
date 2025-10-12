# useLocalStorage

Sync state with localStorage in React.

## API
```ts
const [value, setValue] = useLocalStorage(key, initialValue)
```
- `key`: The localStorage key.
- `initialValue`: Initial value to use if nothing is stored.

## Usage
```tsx
import { useLocalStorage } from 'react-kata';

const [name, setName] = useLocalStorage('username', '');

// name is persisted in localStorage
```

## Notes
- Returns a stateful value and a setter.
- Automatically syncs with localStorage.
- Works with strings, numbers, objects, etc.
