

import { useQueue } from '../useQueue';

describe('useQueue', () => {
  it('basic queue operations', () => {
    // Directly test the hook logic as a plain function
    const queueHook = useQueue([1, 2, 3]);
    expect(queueHook.queue).toEqual([1, 2, 3]);
    queueHook.enqueue(4);
    expect(queueHook.queue).toEqual([1, 2, 3, 4]);
    const first = queueHook.dequeue();
    expect(first).toBe(1);
    expect(queueHook.queue).toEqual([2, 3, 4]);
    expect(queueHook.peek()).toBe(2);
    queueHook.clear();
    expect(queueHook.queue).toEqual([]);
  });

  it('processes items with async callback', async () => {
    const processed: number[] = [];
    const queueHook = useQueue([1, 2], {
      onProcess: async (item) => {
        await new Promise(res => setTimeout(res, 10));
        processed.push(item);
      },
      autoProcess: true
    });
    queueHook.enqueue(3);
    await new Promise(res => setTimeout(res, 50));
    expect(processed).toEqual([1, 2, 3]);
    expect(queueHook.queue).toEqual([]);
  });

  it('manual processQueue works', async () => {
    const processed: number[] = [];
    const queueHook = useQueue([1, 2], {
      onProcess: async (item) => {
        processed.push(item);
      },
      autoProcess: false
    });
    queueHook.enqueue(3);
    await queueHook.processQueue();
    expect(processed).toEqual([1, 2, 3]);
    expect(queueHook.queue).toEqual([]);
  });
});
