# useOnScreenAdvanced

Advanced visibility detection for elements in the viewport.

## API
```ts
const { visible, ratio } = useOnScreenAdvanced(ref, options?);
```
- **ref**: React ref to the element
- **options**: IntersectionObserver options (optional)

## Usage
```tsx
const ref = useRef(null);
const { visible, ratio } = useOnScreenAdvanced(ref);
```

## Notes
- SSR safe
- Provides intersection ratio
