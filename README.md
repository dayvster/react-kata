<div align="center">
  <h1>React Kata</h1>
  <p><strong>Modern, type-safe React hooks for state, effects, events, and more.</strong></p>
  <p>
  <a href="https://www.npmjs.com/package/react-kata"><img src="https://img.shields.io/npm/v/react-kata?style=flat-square" alt="npm version" /></a>
  <img src="https://img.shields.io/npm/dm/react-kata?style=flat-square" alt="npm downloads" />
  <img src="https://img.shields.io/npm/types/react-kata?style=flat-square" alt="types" />
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4?style=flat-square" alt="code style: prettier" />
    <img src="https://img.shields.io/github/last-commit/dayvster/react-kit?style=flat-square" alt="last commit" />
    <img src="https://img.shields.io/github/issues/dayvster/react-kit?style=flat-square" alt="open issues" />
    <img src="https://img.shields.io/github/license/dayvster/react-kit?style=flat-square" alt="license" />
  </p>
</div>

---

## 📚 Table of Contents

- [Installation](#installation)
- [Features](#-features)
- [Usage](#-usage)
- [Hooks Overview](#-hooks-overview)
- [Examples](#-examples)
- [Contributing](#contributing)
- [License](#license)

---


**Why this exists:**

After years of building React apps, I found myself constantly rewriting the same hooks for state, effects, events, and more—across nearly every project. Instead of reinventing the wheel each time, I decided to gather, refine, and open source my favorite utilities in one place. React Kata is for anyone who wants reliable, well-tested hooks that just work, so you can focus on building features instead of boilerplate.

**React Kata** is a growing collection of modern React hooks for state, effects, events, storage, and more. Designed for clarity, performance, and real-world use—with a clean API, SSR compatibility, and TypeScript support. Save time, avoid boilerplate, and ship faster.

---



## 📦 Installation

Install with npm:

```bash
npm install react-kata
```

Or with yarn:

```bash
yarn add react-kata
```

Or with pnpm:

```bash
pnpm add react-kata
```

---

## 🚀 Features

- **Comprehensive**: State, events, effects, storage, media, accessibility, and more
- **SSR-safe**: All hooks work with server-side rendering
- **TypeScript**: Fully typed for safety and IDE support
- **Tested**: 100% coverage with Jest & React Testing Library
- **Ergonomic APIs**: Designed for real-world usage and developer happiness

---

## 🛠 Usage

Import only the hooks you need:

```tsx
import { useQueue } from 'react-kata';

const { queue, enqueue, dequeue, clear, peek, processQueue, processing } = useQueue([1, 2, 3], {
  onProcess: async (item) => {
    await doAsyncThing(item);
  },
  autoProcess: true // automatically process items as they are enqueued
});

enqueue(4); // queue: [1,2,3,4]
// Items will be processed one by one with onProcess
```

---

## 🧩 Hooks Overview

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
| `useMount`           | Run a callback once when the component mounts         |
| `useUnmount`         | Run a callback once when the component unmounts       |
| `useCopyToClipboard` | Copy text to clipboard and get success/error status   |
| `useIdle`            | (WIP) Track if the user is idle for a given timeout. Not yet stable. |
| `useTheme`           | Track and toggle between light/dark color schemes     |
| `usePrefersReducedMotion` | Track if the user prefers reduced motion (accessibility) |
| `useGeolocation`     | Track the user's geolocation (latitude, longitude, etc.) |
| `useReload`          | Returns a function to reload the current page         |
| `useCookie`          | Get, set, and delete a cookie value                   |
| `useWindowFocus`     | Track if the window is focused                        |
| `useDocumentTitle`   | Set the document title, optionally restore on unmount |
| `useImagePreload`    | Preload an image and track its loading status          |
| `useShimmer`         | Generate a shimmer SVG placeholder for loading content |
| `useElementReplace`   | Use a custom React element as a placeholder or replacement |
| `useScriptLoader`      | Dynamically load an external script and track its status |
| `useFocusTrap`          | Trap keyboard focus within a container (e.g., modal) |
| `useElementSize`         | Get the size (width, height) of a DOM element via ref |
| `useElementPosition`     | Get the position (top, left, right, bottom) of a DOM element via ref |
| `useKeySequence`          | Detect a specific sequence of key presses and trigger a callback |
| `useQueue`                | Manage a queue of items with enqueue, dequeue, clear, and peek operations |
## Example: useShimmer
```tsx
import { useShimmer } from 'react-kata';

function ShimmerDemo() {
  const shimmer = useShimmer(400, 300);
  return <img src={`data:image/svg+xml;utf8,${encodeURIComponent(shimmer)}`} alt="Loading..." />;
}
```
## Example: useElementReplace
```tsx
import { useElementReplace } from 'react-kata';

function CustomLoaderDemo() {
  const placeholder = useElementReplace(
    <div style={{ background: '#eee', borderRadius: 8, display: 'inline-block' }}>
      Loading...
    </div>,
    120,
    40
  );
  return placeholder;
}
## Example: useScriptLoader
```tsx
import { useScriptLoader } from 'react-kata';

function ScriptDemo() {
  const { status, error } = useScriptLoader('https://example.com/script.js');
  if (status === 'loading') return <div>Loading script...</div>;
  if (status === 'error') return <div>Error: {error?.message}</div>;
  return <div>Script loaded!</div>;
}
```
## Example: useFocusTrap
```tsx
import { useFocusTrap } from 'react-kata';

function Modal({ open }: { open: boolean }) {
  const ref = useFocusTrap(open);
  if (!open) return null;
  return (
    <div ref={ref} tabIndex={-1} style={{ outline: '2px solid #09f', padding: 20 }}>
      <button>First</button>
      <input placeholder="Second" />
      <button>Last</button>
    </div>
  );
}
```
## Example: useElementSize
```tsx
import { useElementSize } from 'react-kata';

function SizeDemo() {
  const [ref, size] = useElementSize();
  return (
    <div ref={ref} style={{ width: 200, height: 100, background: '#eee' }}>
      Width: {size.width}, Height: {size.height}
    </div>
  );
}
```
## Example: useElementPosition
```tsx
import { useElementPosition } from 'react-kata';

function PositionDemo() {
  const [ref, pos] = useElementPosition();
  return (
    <div ref={ref} style={{ position: 'absolute', top: 50, left: 100, background: '#def' }}>
      Top: {pos.top}, Left: {pos.left}, Right: {pos.right}, Bottom: {pos.bottom}
    </div>
  );
}
```
## Example: useKeySequence
```tsx
import { useKeySequence } from 'react-kata';

function SecretCodeDemo() {
  useKeySequence(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'], () => alert('Konami!'));
  return <div>Try the secret key sequence!</div>;
}
```
```
## Example: useThrottle
```tsx
import { useThrottle } from 'react-kata';

function ThrottleDemo({ value }: { value: string }) {
  // Throttle value updates to every 500ms, with initial default value ''
  const throttledValue = useThrottle(value, 500, '');
  return <div>Throttled value: {throttledValue}</div>;
}
```

## Example: useImagePreload
```tsx
import { useImagePreload } from 'react-kata';

function ImageDemo({ src, fallback }: { src: string, fallback?: string }) {
  const { status, error } = useImagePreload(src);
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return fallback ? <img src={fallback} alt="Fallback" /> : <div>Error loading image: {error?.message}</div>;
  return <img src={src} alt="Preloaded" />;
}
```
## Example: useDocumentTitle
```tsx
import { useDocumentTitle } from 'react-kata';

function TitleDemo() {
  useDocumentTitle('My Page Title', { restoreOnUnmount: true });
  return <div>Check the browser tab title!</div>;
}
```
## Example: useWindowFocus
```tsx
import { useWindowFocus } from 'react-kata';

function FocusDemo() {
  const isFocused = useWindowFocus();
  return <div>Window is {isFocused ? 'focused' : 'blurred'}</div>;
}
```
## Example: useCookie
```tsx
import { useCookie } from 'react-kata';

function CookieDemo() {
  const [cookie, setCookie, deleteCookie] = useCookie('myCookie');

  return (
    <div>
      <div>Cookie value: {cookie}</div>
      <button onClick={() => setCookie('newValue')}>Set Cookie</button>
      <button onClick={deleteCookie}>Delete Cookie</button>
    </div>
  );
}
```

## Example
```tsx
import { useOnKeyPressed, useDebounce, useLocalStorage, useOnScreen } from 'react-kata';
const ref = React.useRef(null);
const isOnScreen = useOnScreen(ref);
import { useFetch } from 'react-kata';

function Demo() {
  const { key } = useKeyPress();
  useOnKeyPressed('Enter', () => alert('Enter pressed!'));
  const [value, setValue] = useLocalStorage('my-key', '');
  const debouncedValue = useDebounce(value, 300, ''); // '' is the default value
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
import { useWhyDidYouUpdate } from 'react-kata';

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

## Example: useMount
```tsx
import React from 'react';
import { useMount } from 'react-kata';

function Demo() {
  useMount(() => {
    alert('Mounted!');
  });
  return <div>Component mounted</div>;
}
```

## Example: useUnmount
```tsx
import React from 'react';
import { useUnmount } from 'react-kata';

function Demo() {
  useUnmount(() => {
    alert('Unmounted!');
  });
  return <div>Component mounted</div>;
}
```

## Example: useCopyToClipboard
```tsx
import React from 'react';
import { useCopyToClipboard } from 'react-kata';

function Demo() {
  const [copy, { success, error }] = useCopyToClipboard();
  return (
    <div>
      <button onClick={() => copy('Hello world!')}>Copy</button>
      {success && <span>Copied!</span>}
      {error && <span>Error: {error}</span>}
    </div>
  );
}
```

## Example: useIdle
```tsx
import React from 'react';
import { useIdle } from 'react-kata';

function Demo() {
  const isIdle = useIdle(5000); // 5 seconds
  return <div>{isIdle ? 'Idle' : 'Active'}</div>;
}
```

## Example: useTheme
```tsx
import React from 'react';
import { useTheme } from 'react-kata';

function Demo() {
  // Supports auto, light, dark, and custom themes
  const [theme, setTheme, toggleTheme] = useTheme(["auto", "light", "dark", "solarized"]);
  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("solarized")}>Solarized</button>
      <button onClick={() => setTheme("auto")}>Auto</button>
    </div>
  );
}
```

## Example: usePrefersReducedMotion
```tsx
import React from 'react';
import { usePrefersReducedMotion } from 'react-kata';

function Demo() {
  const prefersReducedMotion = usePrefersReducedMotion();
  return <div>{prefersReducedMotion ? 'Reduced motion enabled' : 'Normal motion'}</div>;
}
```

## Example: useGeolocation
```tsx
import React from 'react';
import { useGeolocation } from 'react-kata';

function Demo() {
  const { position, error, loading } = useGeolocation();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <div>Latitude: {position?.coords.latitude}</div>
      <div>Longitude: {position?.coords.longitude}</div>
    </div>
  );
}
```

## Example: useReload
```tsx
import React from 'react';
import { useReload } from 'react-kata';

function Demo() {
  // Only reload if user confirms
  const reload = useReload(() => window.confirm('Reload?'));
  return <button onClick={reload}>Reload Page</button>;
}
```

## Contributing
Pull requests and issues welcome! Please add tests for any new features or bug fixes.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
