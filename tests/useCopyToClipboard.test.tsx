import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../src/useCopyToClipboard';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    // @ts-ignore
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
    };
  });

  it('copies text to clipboard and sets success', async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      await result.current[0]('test');
    });
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('test');
    expect(result.current[1].success).toBe(true);
    expect(result.current[1].error).toBeNull();
  });

  it('sets error if copy fails', async () => {
    // @ts-ignore
    global.navigator.clipboard.writeText = jest.fn().mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      await result.current[0]('test');
    });
    expect(result.current[1].success).toBe(false);
    expect(result.current[1].error).toBe('fail');
  });
});
