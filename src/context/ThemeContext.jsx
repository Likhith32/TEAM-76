import { createContext, useContext, useEffect, useState } from "react";

/**
 * Theme Context
 * dark | light
 */
const ThemeContext = createContext(null);

// Helper: get initial theme safely (handles SSR + prefers-color-scheme)
const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Sync <html data-theme> and localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // React to OS-level theme changes if user has not explicitly chosen
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (event) => {
      const stored = window.localStorage.getItem("theme");
      if (!stored) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    } else {
      // Safari fallback
      mql.addListener(handler);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
