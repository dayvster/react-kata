# useOnKeyPressed

Runs a callback when a specific key is pressed.

## API
```ts
useOnKeyPressed(key, callback);
```
- **key**: Key to detect
- **callback**: Function to run

## Usage
```tsx
useOnKeyPressed('Escape', () => setOpen(false));
```

## Notes
- SSR safe
- Useful for modal close, shortcuts
