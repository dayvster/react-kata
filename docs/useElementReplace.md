# useElementReplace

Replaces a DOM element with another React element.

## API
```ts
useElementReplace(ref, replacement)
```
- **ref**: React ref to the element to replace
- **replacement**: React element to render in place

## Usage
```tsx
const ref = useRef(null);
useElementReplace(ref, <span>Replaced!</span>);
```

## Notes
- SSR safe
- Useful for dynamic UI changes
