import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { themes, ThemeColors, ThemeMode } from '../utils/theme';
import { SecureStorage } from '../utils/SecureStorage';

interface ThemeContextProps {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setThemeMode: (value: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const STORAGE_KEY = 'APP_THEME_MODE';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();

  const [mode, setMode] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Load saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = SecureStorage.getString(STORAGE_KEY);
        if (savedTheme) {
          setMode(savedTheme as ThemeMode);
        }
      } catch (e) {
        console.log('Failed to load theme', e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // ✅ Persist theme when changed
  const setThemeMode = async (value: ThemeMode) => {
    try {
      setMode(value);
      SecureStorage.set(STORAGE_KEY, value);
    } catch (e) {
      console.log('Failed to save theme', e);
    }
  };

  // ✅ Resolve actual theme
  const currentTheme: 'light' | 'dark' =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const colors = themes[currentTheme];

  const toggleTheme = () => {
    setThemeMode(mode === 'light' ? 'dark' : 'light');
  };

  // ✅ Prevent flicker before loading
  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
