import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useColorScheme } from "react-native";

export type IThemeProviderProps = {
    children: React.ReactNode;
}

// Define the shape of the context data using a TypeScript interface
type ThemeContextData = {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({
    theme: 'light',
    toggleTheme: () => {},
})

export function useTheme(): any {
    return useContext(ThemeContext);
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children } ) => {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        if(systemTheme && typeof systemTheme === 'string')
            setTheme(systemTheme);
    }, [systemTheme]);

    // Function to toggle the theme between light and dark
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }} >
            {children}
        </ThemeContext.Provider>
    )
}