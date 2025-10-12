# React Kata Documentation

Welcome to the documentation for React Kata! This file provides a simple overview of the available hooks and their usage.

## Table of Contents
- [Installation](#installation)
- [Available Hooks](#available-hooks)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)

---

## Installation

```bash
npm install react-kata
```

---

## Available Hooks

- `useDebounce`
- `useThrottle`
- `useInterval`
- `useTimeout`
- `useLocalStorage`
- `useSessionStorage`
- `usePrevious`
- `useClickOutside`
- `useToggle`
- `useUpdateEffect`
- `useMediaQuery`
- `useWindowSize`
- `useScrollPosition`
- `useKeyPress`
- `useOnKeyPressed`
- `useFetch`
- `useFocus`
- `useHovered`
- `useEventListener`
- `useOnScreen`
- `useOnScreenAdvanced`
- `useWhyDidYouUpdate`
- `useMount`
- `useUnmount`
- `useCopyToClipboard`
- `useIdle`
- `useTheme`
- `usePrefersReducedMotion`
- `useGeolocation`
- `useReload`
- `useCookie`
- `useElementReplace`
- `useScriptLoader`
- `useFocusTrap`
- `useElementSize`
- `useElementPosition`
- `useKeySequence`
- `useQueue`
- `useShimmer`
- `useImagePreload`

---

## Usage Examples

```tsx
import { useDebounce, useThrottle, useLocalStorage } from 'react-kata';

const debouncedValue = useDebounce(value, 300, '');
const throttledValue = useThrottle(value, 500, '');
const [stored, setStored] = useLocalStorage('key', 'default');
```

See the README for more detailed examples of each hook.

---


## Hook Documentation Index

Below is a clickable index of all available hooks. Click any hook to view its documentation:

| Hook | Link |
|------|------|
| useClickOutside | [useClickOutside.md](./useClickOutside.md) |
| useCookie | [useCookie.md](./useCookie.md) |
| useCopyToClipboard | [useCopyToClipboard.md](./useCopyToClipboard.md) |
| useDebounce | [useDebounce.md](./useDebounce.md) |
| useDocumentTitle | [useDocumentTitle.md](./useDocumentTitle.md) |
| useElementPosition | [useElementPosition.md](./useElementPosition.md) |
| useElementReplace | [useElementReplace.md](./useElementReplace.md) |
| useElementSize | [useElementSize.md](./useElementSize.md) |
| useEventListener | [useEventListener.md](./useEventListener.md) |
| useFetch | [useFetch.md](./useFetch.md) |
| useFocus | [useFocus.md](./useFocus.md) |
| useFocusTrap | [useFocusTrap.md](./useFocusTrap.md) |
| useGeolocation | [useGeolocation.md](./useGeolocation.md) |
| useHover | [useHover.md](./useHover.md) |
| useIdle | [useIdle.md](./useIdle.md) |
| useImagePreload | [useImagePreload.md](./useImagePreload.md) |
| useInterval | [useInterval.md](./useInterval.md) |
| useKeyPress | [useKeyPress.md](./useKeyPress.md) |
| useKeySequence | [useKeySequence.md](./useKeySequence.md) |
| useLocalStorage | [useLocalStorage.md](./useLocalStorage.md) |
| useMediaQuery | [useMediaQuery.md](./useMediaQuery.md) |
| useMount | [useMount.md](./useMount.md) |
| useOnKeyPressed | [useOnKeyPressed.md](./useOnKeyPressed.md) |
| useOnScreen | [useOnScreen.md](./useOnScreen.md) |
| useOnScreenAdvanced | [useOnScreenAdvanced.md](./useOnScreenAdvanced.md) |
| usePrefersReducedMotion | [usePrefersReducedMotion.md](./usePrefersReducedMotion.md) |
| usePrevious | [usePrevious.md](./usePrevious.md) |
| useQueue | [useQueue.md](./useQueue.md) |
| useReload | [useReload.md](./useReload.md) |
| useScriptLoader | [useScriptLoader.md](./useScriptLoader.md) |
| useScrollPosition | [useScrollPosition.md](./useScrollPosition.md) |
| useSessionStorage | [useSessionStorage.md](./useSessionStorage.md) |
| useShimmer | [useShimmer.md](./useShimmer.md) |
| useTheme | [useTheme.md](./useTheme.md) |
| useThrottle | [useThrottle.md](./useThrottle.md) |
| useTimeout | [useTimeout.md](./useTimeout.md) |
| useToggle | [useToggle.md](./useToggle.md) |
| useUnmount | [useUnmount.md](./useUnmount.md) |
| useUpdateEffect | [useUpdateEffect.md](./useUpdateEffect.md) |
| useWhyDidYouUpdate | [useWhyDidYouUpdate.md](./useWhyDidYouUpdate.md) |
| useWindowFocus | [useWindowFocus.md](./useWindowFocus.md) |
| useWindowSize | [useWindowSize.md](./useWindowSize.md) |
