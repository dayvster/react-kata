import { renderHook } from '@testing-library/react';
import { useGeolocation } from '../src/useGeolocation';

describe('useGeolocation', () => {
  beforeEach(() => {
    // @ts-ignore
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
    };
  });

  it('returns position on success', async () => {
    const mockPosition = {
      coords: { latitude: 1, longitude: 2 },
      timestamp: Date.now(),
      toJSON: () => ({})
    } as GeolocationPosition;
    // @ts-ignore
    global.navigator.geolocation.getCurrentPosition = jest.fn((success) => {
      success(mockPosition);
    });
    const { result } = renderHook(() => useGeolocation());
  await Promise.resolve();
    expect(result.current.position).toEqual(mockPosition);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('returns error on failure', async () => {
    const mockError = {
      code: 1,
      message: 'fail',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    } as GeolocationPositionError;
    // @ts-ignore
    global.navigator.geolocation.getCurrentPosition = jest.fn((_, fail) => {
      if (fail) fail(mockError);
    });
    const { result } = renderHook(() => useGeolocation());
  await Promise.resolve();
    expect(result.current.position).toBeNull();
    expect(result.current.error).toBe('fail');
    expect(result.current.loading).toBe(false);
  });

  it('returns error if geolocation not supported', async () => {
    // @ts-ignore
    delete global.navigator.geolocation;
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.position).toBeNull();
    expect(result.current.error).toBe('Geolocation is not supported');
    expect(result.current.loading).toBe(false);
  });
});
