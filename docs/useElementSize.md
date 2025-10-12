# useElementSize

Tracks the size of a DOM element.

## API
```ts
const size = useElementSize(ref);
```
- **ref**: React ref to the element
- **size**: `{ width, height }`

## Usage
```tsx
const ref = useRef(null);
const size = useElementSize(ref);
```

## Notes
- SSR safe
- Updates on resize
