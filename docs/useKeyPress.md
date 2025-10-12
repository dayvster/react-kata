# useKeyPress

Detects when a specific key is pressed.

## API
```ts
const pressed = useKeyPress(key);
```
- **key**: Key to detect (e.g., 'Enter')

## Usage
```tsx
const enterPressed = useKeyPress('Enter');
```

## Notes
- SSR safe
- Useful for keyboard shortcuts
