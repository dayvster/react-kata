# useOnScreen

Detects if an element is visible in the viewport.

## API
```ts
const visible = useOnScreen(ref, options?);
```
- **ref**: React ref to the element
- **options**: IntersectionObserver options (optional)

## Usage
```tsx
const ref = useRef(null);
const visible = useOnScreen(ref);
```

## Notes
- SSR safe
- Useful for lazy loading, animations
