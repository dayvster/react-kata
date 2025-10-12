# useShimmer

Creates a shimmer loading effect for UI elements.

## API
```ts
const shimmer = useShimmer(options?);
```
- **options**: Shimmer effect options (optional)

## Usage
```tsx
const shimmer = useShimmer();
return <div style={shimmer} />;
```

## Notes
- SSR safe
- Useful for skeleton loaders
