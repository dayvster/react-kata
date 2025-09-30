import React, { useRef } from 'react';
import { render, act } from '@testing-library/react';
import { useOnScreen } from '../src/useOnScreen';

describe('useOnScreen', () => {
  let observe: jest.Mock;
  let disconnect: jest.Mock;

  beforeAll(() => {
    observe = jest.fn();
    disconnect = jest.fn();
    // @ts-ignore
    global.IntersectionObserver = jest.fn(function (cb) {
      this.observe = observe;
      this.disconnect = disconnect;
      this.trigger = (isIntersecting: boolean) => {
        cb([
          {
            isIntersecting,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: isIntersecting ? 1 : 0,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            target: document.createElement('div'),
            time: Date.now(),
          }
        ], this);
      };
    });
  });

  afterEach(() => {
    observe.mockClear();
    disconnect.mockClear();
  });

  it('returns true when element is on screen', () => {
    let trigger: (isIntersecting: boolean) => void = () => {};
    function TestComponent() {
      const ref = useRef(null);
      const isOnScreen = useOnScreen(ref);
      React.useEffect(() => {
        // @ts-ignore
        trigger = (global.IntersectionObserver as any).mock.instances[0].trigger;
      }, []);
      return <div ref={ref} data-testid="box">{isOnScreen ? 'On' : 'Off'}</div>;
    }
    const { getByTestId } = render(<TestComponent />);
    act(() => {
      trigger(true);
    });
    expect(getByTestId('box').textContent).toBe('On');
    act(() => {
      trigger(false);
    });
    expect(getByTestId('box').textContent).toBe('Off');
  });

  it('disconnects observer on unmount', () => {
    function TestComponent() {
      const ref = useRef(null);
      useOnScreen(ref);
      return <div ref={ref} />;
    }
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
