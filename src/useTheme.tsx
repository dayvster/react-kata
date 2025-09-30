import { useEffect, useState } from 'react';

/**
 * useTheme - Tracks the current color scheme ("auto", "light", "dark", or custom) and allows toggling.
 * @param themes - Array of theme names (default: ["auto", "light", "dark"])
 * @returns [theme, setTheme, toggleTheme]
 */
export function useTheme(
  themes: string[] = ["auto", "light", "dark"]
): [string, (theme: string) => void, () => void] {
  const getSystemTheme = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

  const [theme, setThemeState] = useState<string>(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored && themes.includes(stored)) return stored;
    return themes.includes("auto") ? "auto" : themes[0];
  });

  // Set theme on DOM and localStorage
  useEffect(() => {
    let applied = theme;
    if (theme === "auto") {
      applied = getSystemTheme();
    }
    window.localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', applied);
  }, [theme]);

  // Listen for system theme changes if "auto"
  useEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.setAttribute('data-theme', getSystemTheme());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = (t: string) => {
    if (themes.includes(t)) setThemeState(t);
  };

  const toggleTheme = () => {
    const idx = themes.indexOf(theme);
    setThemeState(themes[(idx + 1) % themes.length]);
  };

  return [theme, setTheme, toggleTheme];
}
