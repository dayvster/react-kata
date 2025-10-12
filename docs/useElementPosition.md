# useElementPosition

Tracks the position of a DOM element.

## API
```ts
const position = useElementPosition(ref);
```
- **ref**: React ref to the element
- **position**: `{ top, left, right, bottom }`

## Usage
```tsx
const ref = useRef(null);
const pos = useElementPosition(ref);
```

## Notes
- SSR safe
- Updates on scroll and resize
