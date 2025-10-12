# useUnmount

Runs a callback when the component unmounts.

## API
```ts
useUnmount(callback);
```
- **callback**: Function to run on unmount

## Usage
```tsx
useUnmount(() => {
  // cleanup
});
```

## Notes
- SSR safe
- Useful for cleanup logic
