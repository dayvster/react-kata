import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetch } from '../src/useFetch';

describe('useFetch', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // @ts-ignore
    global.fetch.mockClear();
  });

  it('fetches data successfully', async () => {
    const mockData = { foo: 'bar' };
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
  const { result } = renderHook(() => useFetch('https://api.example.com/data'));
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.data).toEqual(mockData);
  expect(result.current.error).toBeNull();
  });

  it('handles fetch error', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({}),
    });
  const { result } = renderHook(() => useFetch('https://api.example.com/data'));
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.data).toBeNull();
  expect(result.current.error).toBeInstanceOf(Error);
  });

  it('can refetch', async () => {
    const mockData = { foo: 'bar' };
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
    const { result } = renderHook(() => useFetch('https://api.example.com/data'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);
    // Change fetch result
    const mockData2 = { baz: 'qux' };
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData2,
    });
    act(() => {
      result.current.refetch();
    });
    await waitFor(() => expect(result.current.data).toEqual(mockData2));
  });
});
