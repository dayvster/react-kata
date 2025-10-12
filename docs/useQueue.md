# useQueue

Manages a queue of items with enqueue/dequeue operations.

## API
```ts
const [queue, { enqueue, dequeue, clear }] = useQueue(initial?);
```
- **initial**: Initial queue items (optional)

## Usage
```tsx
const [queue, { enqueue, dequeue }] = useQueue([1,2,3]);
enqueue(4);
dequeue();
```

## Notes
- SSR safe
- Useful for task management
