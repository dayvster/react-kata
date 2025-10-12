# useGeolocation

Tracks the user's geolocation using the browser API.

## API
```ts
const { position, error } = useGeolocation(options?);
```
- **options**: Geolocation options (optional)

## Usage
```tsx
const { position } = useGeolocation();
```

## Notes
- SSR safe
- Handles permission errors
