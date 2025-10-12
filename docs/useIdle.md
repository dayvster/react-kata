# useIdle

Detects when the user is idle for a specified time.

## API
```ts
const idle = useIdle(timeout?, defaultValue?);
```
- **timeout**: Idle timeout in ms (default: 1000)
- **defaultValue**: Initial idle state (optional)

## Usage
```tsx
const idle = useIdle(5000);
```

## Notes
- SSR safe
- Useful for auto-logout, inactivity detection
