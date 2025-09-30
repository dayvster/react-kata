import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../src/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to auto if provided', () => {
    const { result } = renderHook(() => useTheme(["auto", "light", "dark"]));
    expect(result.current[0]).toBe("auto");
  });

  it('applies system theme when auto', () => {
    const { result } = renderHook(() => useTheme(["auto", "light", "dark"]));
    expect(["light", "dark"]).toContain(document.documentElement.getAttribute('data-theme'));
  });

  it('toggles through all themes', () => {
    const { result } = renderHook(() => useTheme(["auto", "light", "dark", "solarized"]));
    const initial = result.current[0];
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).not.toBe(initial);
    act(() => {
      result.current[2]();
    });
    act(() => {
      result.current[2]();
    });
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(initial);
  });

  it('sets custom theme', () => {
    const { result } = renderHook(() => useTheme(["auto", "light", "dark", "solarized"]));
    act(() => {
      result.current[1]("solarized");
    });
    expect(result.current[0]).toBe("solarized");
    expect(document.documentElement.getAttribute('data-theme')).toBe("solarized");
  });

  it('sets custom theme', () => {
    const { result } = renderHook(() => useTheme(["auto", "light", "dark", "solarized"]));
    act(() => {
      result.current[1]("solarized");
    });
    expect(result.current[0]).toBe("solarized");
    expect(document.documentElement.getAttribute('data-theme')).toBe("solarized");
  });
});
