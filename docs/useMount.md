# useMount

Runs a callback once when the component mounts.

## API
```ts
useMount(callback);
```
- **callback**: Function to run on mount

## Usage
```tsx
useMount(() => {
  // initialize
});
```

## Notes
- SSR safe
- Useful for setup logic
