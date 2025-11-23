import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Theme Context for dark mode support
 * Supports: light, dark, system (auto-detect)
 */
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage and apply
  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'system';
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newTheme);
      applyThemeToDOM(newTheme);
    };

    // Check initial value
    const newTheme = mediaQuery.matches ? 'dark' : 'light';
    setResolvedTheme(newTheme);
    applyThemeToDOM(newTheme);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  /**
   * Apply theme to DOM
   */
  const applyThemeToDOM = (themeValue) => {
    const html = document.documentElement;
    if (themeValue === 'dark') {
      html.classList.add('dark');
      document.body.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      document.body.style.colorScheme = 'light';
    }
  };

  /**
   * Apply theme based on setting
   */
  const applyTheme = (themeValue) => {
    if (themeValue === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = isDark ? 'dark' : 'light';
      setResolvedTheme(resolved);
      applyThemeToDOM(resolved);
    } else {
      setResolvedTheme(themeValue);
      applyThemeToDOM(themeValue);
    }
  };

  /**
   * Toggle theme
   */
  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setResolvedTheme(next);
    localStorage.setItem('theme', next);
    applyThemeToDOM(next);
  };

  /**
   * Set specific theme
   */
  const setThemeMode = (mode) => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
    applyTheme(mode);
  };

  const value = {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme: setThemeMode,
    isDark: resolvedTheme === 'dark',
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
