import React, { createContext, useContext, useEffect, useState } from 'react';

const defaultThemeState = {
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: true,
};

const ThemeContext = createContext(defaultThemeState);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('civic_theme');

    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    // CivicEye is intentionally dark-first.
    return 'dark';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    localStorage.setItem('civic_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext) || defaultThemeState;
}