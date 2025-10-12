# useDocumentTitle

Sets the document title in a React component.

## API
```ts
useDocumentTitle(title: string, restoreOnUnmount?: boolean)
```
- **title**: The title to set
- **restoreOnUnmount**: If true, restores previous title on unmount (default: false)

## Usage
```tsx
useDocumentTitle('My Page');
```

## Notes
- SSR safe
- Useful for dynamic page titles
