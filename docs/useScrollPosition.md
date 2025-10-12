# useScrollPosition

Tracks the scroll position of an element or window.

## API
```ts
const position = useScrollPosition(ref?);
```
- **ref**: React ref to the element (optional, defaults to window)

## Usage
```tsx
const pos = useScrollPosition();
```

## Notes
- SSR safe
- Useful for infinite scroll, animations
