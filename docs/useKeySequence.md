# useKeySequence

Detects a sequence of key presses.

## API
```ts
const matched = useKeySequence(sequence);
```
- **sequence**: Array of keys (e.g., ['g', 'h'])

## Usage
```tsx
const konami = useKeySequence(['ArrowUp','ArrowUp','ArrowDown','ArrowDown']);
```

## Notes
- SSR safe
- Useful for cheat codes, shortcuts
