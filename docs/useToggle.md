# useToggle

Manages a boolean state with a toggle function.

## API
```ts
const [value, toggle] = useToggle(initial?);
```
- **initial**: Initial value (optional)

## Usage
```tsx
const [open, toggle] = useToggle(false);
toggle();
```

## Notes
- SSR safe
- Useful for UI toggles
