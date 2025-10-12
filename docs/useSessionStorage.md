# useSessionStorage

Sync state with sessionStorage in React.

## API
```ts
const [value, setValue] = useSessionStorage(key, initialValue)
```
- `key`: The sessionStorage key.
- `initialValue`: Initial value to use if nothing is stored.

## Usage
```tsx
import { useSessionStorage } from 'react-kata';

const [token, setToken] = useSessionStorage('authToken', '');

// token is persisted in sessionStorage
```

## Notes
- Returns a stateful value and a setter.
- Automatically syncs with sessionStorage.
- Works with strings, numbers, objects, etc.
