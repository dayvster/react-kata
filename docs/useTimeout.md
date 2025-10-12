# useTimeout

Runs a callback after a timeout.

## API
```ts
useTimeout(callback, delay?);
```
- **callback**: Function to run
- **delay**: Timeout in ms (default: 1000)

## Usage
```tsx
useTimeout(() => setReady(true), 2000);
```

## Notes
- SSR safe
- Clears timeout on unmount
