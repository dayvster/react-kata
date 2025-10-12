# useCookie

Manages browser cookies with React state.

## API
```ts
const [cookie, setCookie, deleteCookie] = useCookie(key, defaultValue?);
```
- **key**: Cookie name
- **defaultValue**: Optional default value

## Usage
```tsx
const [token, setToken, deleteToken] = useCookie('token');
setToken('abc123');
deleteToken();
```

## Notes
- SSR safe
- Automatically updates on cookie change
