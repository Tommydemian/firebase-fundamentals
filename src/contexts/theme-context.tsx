import React, { createContext, useState, SetStateAction } from 'react';

type Theme = 'light' | 'dark'

type ThemeProviderProps = {
    children: React.ReactNode
}

type ThemeContextType = {
    theme: Theme
    setTheme: React.Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {}
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};