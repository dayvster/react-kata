# useInterval

Runs a callback at specified intervals.

## API
```ts
useInterval(callback, delay?);
```
- **callback**: Function to run
- **delay**: Interval in ms (default: 1000)

## Usage
```tsx
useInterval(() => setCount(c => c + 1), 1000);
```

## Notes
- SSR safe
- Clears interval on unmount
