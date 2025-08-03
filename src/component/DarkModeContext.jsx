import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the context
const DarkModeContext = createContext();

// Provider component
export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedPreference = localStorage.getItem('darkMode');
            if (savedPreference !== null) {
                return savedPreference === 'true';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Memoized function to apply dark mode class and save preference
    const applyDarkMode = useCallback((darkMode) => {
        const htmlElement = document.documentElement;
        if (darkMode) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode.toString());
    }, []);

    useEffect(() => {
        applyDarkMode(isDarkMode);
    }, [isDarkMode, applyDarkMode]);

    // Toggle function
    const toggleDarkMode = useCallback(() => {
        setIsDarkMode((prevMode) => !prevMode);
    }, []);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// Custom hook for easy access
export const useDarkMode = () => useContext(DarkModeContext);
