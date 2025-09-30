import { useMemo } from 'react';

/**
 * useShimmer - React hook to generate a shimmer SVG placeholder for images or content loading.
 *
 * @param width Width of the shimmer placeholder (px)
 * @param height Height of the shimmer placeholder (px)
 * @param color Base color of the shimmer (default: #f6f7f8)
 * @param highlight Highlight color of the shimmer (default: #edeef1)
 * @returns SVG string for shimmer effect
 *
 * @example
 * const shimmer = useShimmer(400, 300);
 *
 */
export function useShimmer(
  width: number,
  height: number,
  color: string = '#f6f7f8',
  highlight: string = '#edeef1'
): string {
  return useMemo(() => {
    return `
      <svg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'>
        <defs>
          <linearGradient id='g'>
            <stop stop-color='${color}' offset='20%' />
            <stop stop-color='${highlight}' offset='50%' />
            <stop stop-color='${color}' offset='70%' />
          </linearGradient>
        </defs>
        <rect width='${width}' height='${height}' fill='${color}' />
        <rect width='${width}' height='${height}' fill='url(#g)'>
          <animate attributeName='x' from='-${width}' to='${width}' dur='1.2s' repeatCount='indefinite' />
        </rect>
      </svg>
    `.replace(/\s+/g, ' ');
  }, [width, height, color, highlight]);
}
