# useClickOutside

Detects clicks outside a specified element and triggers a callback.

## API
```ts
const ref = useRef(null);
useClickOutside(ref, () => {
  // handle outside click
});
```
- **ref**: React ref to the target element
- **callback**: Function to call on outside click

## Usage
```tsx
const ref = useRef(null);
useClickOutside(ref, () => setOpen(false));
return <div ref={ref}>...</div>;
```

## Notes
- Useful for modals, dropdowns, popovers
- SSR safe
