# useEventListener

Attaches an event listener to a target element or window.

## API
```ts
useEventListener(event, handler, target?, options?)
```
- **event**: Event name (e.g., 'click')
- **handler**: Event handler function
- **target**: Element, window, or document (default: window)
- **options**: Event listener options (optional)

## Usage
```tsx
useEventListener('resize', () => setSize(window.innerWidth));
```

## Notes
- SSR safe
- Cleans up on unmount
