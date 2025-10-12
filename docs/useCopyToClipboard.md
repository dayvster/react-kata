# useCopyToClipboard

Provides a function to copy text to the clipboard.

## API
```ts
const [copied, copy] = useCopyToClipboard();
```
- **copied**: Boolean, true if recently copied
- **copy**: Function to copy text

## Usage
```tsx
const [copied, copy] = useCopyToClipboard();
<button onClick={() => copy('Hello!')}>Copy</button>
{copied && <span>Copied!</span>}
```

## Notes
- SSR safe
- Resets copied state after a timeout
