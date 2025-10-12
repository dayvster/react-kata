# useUpdateEffect

Runs an effect only on updates, not on initial mount.

## API
```ts
useUpdateEffect(effect, deps);
```
- **effect**: Effect callback
- **deps**: Dependency array

## Usage
```tsx
useUpdateEffect(() => {
  // run on update only
}, [value]);
```

## Notes
- SSR safe
- Useful for skipping initial render
