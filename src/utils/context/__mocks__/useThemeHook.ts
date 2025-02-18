import { createContext } from 'react';
import { vi } from 'vitest';

export interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export const useTheme = () => ({
  isDarkTheme: false,
  toggleTheme: vi.fn(),
});
