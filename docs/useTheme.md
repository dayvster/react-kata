# useTheme

Manages theme state (e.g., light/dark mode).

## API
```ts
const [theme, setTheme] = useTheme(defaultTheme?);
```
- **defaultTheme**: Initial theme (optional)

## Usage
```tsx
const [theme, setTheme] = useTheme('light');
setTheme('dark');
```

## Notes
- SSR safe
- Useful for theme toggling
