# useFetch

Fetches data from an API endpoint and manages loading/error state.

## API
```ts
const { data, loading, error, refetch } = useFetch(url, options?);
```
- **url**: API endpoint
- **options**: Fetch options (optional)

## Usage
```tsx
const { data, loading } = useFetch('/api/data');
```

## Notes
- SSR safe
- Supports refetching
