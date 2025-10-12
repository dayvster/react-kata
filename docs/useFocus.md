# useFocus

Manages focus state for an element.

## API
```ts
const [focused, setFocused] = useFocus(ref, defaultValue?);
```
- **ref**: React ref to the element
- **defaultValue**: Initial focus state (optional)

## Usage
```tsx
const ref = useRef(null);
const [focused] = useFocus(ref);
```

## Notes
- SSR safe
- Useful for input fields
