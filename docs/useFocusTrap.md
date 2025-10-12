# useFocusTrap

Traps focus within a container (e.g., modal).

## API
```ts
useFocusTrap(ref, active?);
```
- **ref**: React ref to the container
- **active**: Boolean to enable/disable trap (default: true)

## Usage
```tsx
const ref = useRef(null);
useFocusTrap(ref);
```

## Notes
- SSR safe
- Useful for modals and dialogs
