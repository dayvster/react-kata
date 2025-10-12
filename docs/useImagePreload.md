# useImagePreload

Preloads an image and tracks its loading state.

## API
```ts
const { loaded, error } = useImagePreload(src);
```
- **src**: Image URL

## Usage
```tsx
const { loaded } = useImagePreload('/logo.png');
```

## Notes
- SSR safe
- Useful for lazy loading images
