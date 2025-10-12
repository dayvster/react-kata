# useScriptLoader

Loads an external script and tracks its loading state.

## API
```ts
const { loaded, error } = useScriptLoader(src);
```
- **src**: Script URL

## Usage
```tsx
const { loaded } = useScriptLoader('https://example.com/script.js');
```

## Notes
- SSR safe
- Useful for third-party integrations
