# useWhyDidYouUpdate

Logs why a component updated (changed props).

## API
```ts
useWhyDidYouUpdate(name, props);
```
- **name**: Component name
- **props**: Props object

## Usage
```tsx
useWhyDidYouUpdate('MyComponent', props);
```

## Notes
- SSR safe
- Useful for debugging
