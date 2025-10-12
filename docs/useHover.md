# useHover

Tracks hover state for an element.

## API
```ts
const [hovered, setHovered] = useHover(ref, defaultValue?);
```
- **ref**: React ref to the element
- **defaultValue**: Initial hover state (optional)

## Usage
```tsx
const ref = useRef(null);
const [hovered] = useHover(ref);
```

## Notes
- SSR safe
- Useful for tooltips, popovers
