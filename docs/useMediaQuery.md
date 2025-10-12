# useMediaQuery

Tracks a CSS media query state.

## API
```ts
const matches = useMediaQuery(query);
```
- **query**: Media query string (e.g., '(max-width: 600px)')

## Usage
```tsx
const isMobile = useMediaQuery('(max-width: 600px)');
```

## Notes
- SSR safe
- Useful for responsive design
