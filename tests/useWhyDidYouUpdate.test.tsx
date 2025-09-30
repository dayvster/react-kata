import React from 'react';
import { render } from '@testing-library/react';
import { useWhyDidYouUpdate } from '../src/useWhyDidYouUpdate';

describe('useWhyDidYouUpdate', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  function TestComponent(props: { a: number; b: string; callback?: (changed: any) => void }) {
    useWhyDidYouUpdate('TestComponent', props, props.callback);
    return <div>{props.a} {props.b}</div>;
  }
  it('calls callback instead of console.log if provided', () => {
    const cb = jest.fn();
    const { rerender } = render(<TestComponent a={1} b="foo" callback={cb} />);
    rerender(<TestComponent a={2} b="foo" callback={cb} />);
    expect(cb).toHaveBeenCalledWith(expect.objectContaining({ a: { from: 1, to: 2 } }));
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('logs changed props between renders', () => {
    const { rerender } = render(<TestComponent a={1} b="foo" />);
    rerender(<TestComponent a={2} b="foo" />);
    expect(logSpy).toHaveBeenCalledWith(
      '[why-did-you-update] TestComponent',
      expect.objectContaining({ a: { from: 1, to: 2 } })
    );
  });

  it('does not log if props do not change', () => {
    const { rerender } = render(<TestComponent a={1} b="foo" />);
    rerender(<TestComponent a={1} b="foo" />);
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('logs multiple changed props', () => {
    const { rerender } = render(<TestComponent a={1} b="foo" />);
    rerender(<TestComponent a={2} b="bar" />);
    expect(logSpy).toHaveBeenCalledWith(
      '[why-did-you-update] TestComponent',
      expect.objectContaining({
        a: { from: 1, to: 2 },
        b: { from: 'foo', to: 'bar' },
      })
    );
  });
});
