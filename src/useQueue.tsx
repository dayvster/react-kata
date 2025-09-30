import { useState, useCallback, useEffect } from 'react';

/**
 * useQueue - Manage a queue of items with enqueue, dequeue, and clear operations.
 *
 * @param initial - Initial array of items
 * @returns { queue, enqueue, dequeue, clear, peek }
 *
 * @example
 * const { queue, enqueue, dequeue, clear, peek } = useQueue([1, 2, 3]);
 * enqueue(4); // queue: [1,2,3,4]
 * dequeue(); // returns 1, queue: [2,3,4]
 * peek(); // returns 2
 * clear(); // queue: []
 */
export function useQueue<T = any>(
  initial: T[] = [],
  options?: {
    onProcess?: (item: T) => Promise<any> | any;
    autoProcess?: boolean;
  }
) {
  const [queue, setQueue] = useState<T[]>(initial);
  const [processing, setProcessing] = useState(false);

  const enqueue = useCallback((item: T) => {
    setQueue(q => [...q, item]);
  }, []);

  const dequeue = useCallback(() => {
    let ret: T | undefined;
    setQueue(q => {
      if (q.length === 0) return q;
      ret = q[0];
      return q.slice(1);
    });
    return ret;
  }, []);

  const clear = useCallback(() => setQueue([]), []);

  const peek = useCallback(() => (queue.length > 0 ? queue[0] : undefined), [queue]);

  // Process queue items with callback
  const processQueue = useCallback(async () => {
    if (processing || !options?.onProcess) return;
    setProcessing(true);
    while (queue.length > 0) {
      const item = queue[0];
      try {
        await options.onProcess(item);
      } catch (e) {
        // Optionally handle error
      }
      setQueue(q => q.slice(1));
    }
    setProcessing(false);
  }, [queue, options, processing]);

  // Auto process if enabled
  useEffect(() => {
    if (options?.autoProcess && queue.length > 0 && !processing) {
      processQueue();
    }
  }, [queue, options, processing, processQueue]);

  return { queue, enqueue, dequeue, clear, peek, processQueue, processing };
}
