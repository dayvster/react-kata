# React Utils


![npm version](https://img.shields.io/npm/v/dayvster-react-kit?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/dayvster-react-kit?style=flat-square)
![types](https://img.shields.io/npm/types/dayvster-react-kit?style=flat-square)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4?style=flat-square)
![last commit](https://img.shields.io/github/last-commit/dayvster/react-kit?style=flat-square)
![open issues](https://img.shields.io/github/issues/dayvster/react-kit?style=flat-square)
![license](https://img.shields.io/github/license/dayvster/react-kit?style=flat-square)

React Utils is a set of React hooks for state, effects, events, storage, and more. Designed for clarity, performance, and real-world use—with a clean API, SSR compatibility, and TypeScript support. Use it to save time and avoid boilerplate as the library evolves.

## Features
- **Comprehensive**: Covers state, events, effects, storage, media, and more
- **SSR-safe**: All hooks are compatible with server-side rendering
- **TypeScript**: Fully typed for maximum safety and IDE support
- **Tested**: 100% test coverage with Jest and React Testing Library
- **Ergonomic APIs**: Designed for real-world usage and developer happiness

## Installation
```bash
npm install dayvster-react-kit
```
[![npm](https://img.shields.io/npm/v/dayvster-react-kit?style=flat-square)](https://www.npmjs.com/package/dayvster-react-kit)
```

## Usage
Import any hook you need:
import { useDebounce, useOnKeyPressed, useLocalStorage } from 'dayvster-react-kit';
import { useDebounce, useOnKeyPressed, useLocalStorage } from '@dayvster/react-kit';
```
import { useOnKeyPressed, useDebounce, useLocalStorage } from 'dayvster-react-kit';
## Hooks Overview
| Hook                | Description                                      |
|---------------------|--------------------------------------------------|
| `useDebounce`       | Debounce a value or callback                     |
| `useThrottle`       | Throttle a value or callback                     |
| `useInterval`       | Set up intervals with pause/resume/stop          |
| `useTimeout`        | Run a callback after a delay                     |
| `useLocalStorage`   | Sync state with localStorage                     |
| `useSessionStorage` | Sync state with sessionStorage                   |
| `usePrevious`       | Get the previous value of a prop or state        |
| `useClickOutside`   | Detect clicks outside a ref                      |
| `useToggle`         | Toggle between values or booleans                |
| `useUpdateEffect`   | Like useEffect, but skips initial render         |
| `useMediaQuery`     | React to media query changes                     |
| `useWindowSize`     | Track window size responsively                   |
| `useScrollPosition` | Track window scroll position (throttled)         |
| `useKeyPress`       | Get info about the last key pressed              |
| `useOnKeyPressed`   | Run a callback when a specific key is pressed    |
| `useFetch`          | Fetch data from an API endpoint                  |
| `useFocus`          | Track focus state of an element                  |
| `useHovered`        | Track hover state of an element                  |
| `useEventListener`  | Add and clean up event listeners                 |
| `useOnScreen`       | Track if an element is visible in the viewport   |
| `useOnScreenAdvanced` | Track if an element is visible with threshold/duration/callback |
| `useWhyDidYouUpdate` | Log changed props between renders for a component |

## Example
```tsx
import { useOnKeyPressed, useDebounce, useLocalStorage, useOnScreen } from 'dayvster-react-kit';
  const ref = React.useRef(null);
  const isOnScreen = useOnScreen(ref);
import { useFetch } from 'dayvster-react-kit';

function Demo() {
  const { key } = useKeyPress();
  useOnKeyPressed('Enter', () => alert('Enter pressed!'));
  const [value, setValue] = useLocalStorage('my-key', '');
  const debouncedValue = useDebounce(value, 300);
  const { data, error, loading, refetch } = useFetch('https://api.example.com/data');

  return (
    <div>
      <p>Last key pressed: {key}</p>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <p>Debounced value: {debouncedValue}</p>
      <p>API Data: {loading ? 'Loading...' : error ? error.message : JSON.stringify(data)}</p>
      <button onClick={refetch}>Refetch</button>
      <div ref={ref} style={{ height: 100, background: isOnScreen ? 'lime' : 'tomato' }}>
        {isOnScreen ? 'On Screen' : 'Off Screen'}
      </div>
    </div>
  );
}
```

## Example: useWhyDidYouUpdate
```tsx
import React, { useState } from 'react';
import { useWhyDidYouUpdate } from 'dayvster-react-kit';

function Demo(props) {
  // Logs changed props to console by default
  useWhyDidYouUpdate('Demo', props);
  // Or provide a callback to handle changes
  useWhyDidYouUpdate('Demo', props, changedProps => {
    // Custom handling, e.g. send to analytics
    alert('Changed: ' + JSON.stringify(changedProps));
  });
  return <div>{props.value}</div>;
}
```

## Contributing
Pull requests and issues welcome! Please add tests for any new features or bug fixes.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
