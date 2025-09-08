export const baseColors = {
  // Brand colors (same in both themes)
  mainRed: "#E3646E",
  mainGreen: "#82BC4F",
  mainPurple: "#BB72E9",
  mainBlue: "#3996DB",
  mainYellow: "#EABD5F",

  // Light theme colors
  light: {
    background: "#FFFFFF",
    surface: "#F8F9FA",
    surfaceElevated: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#4A5568",
    textMuted: "#718096",
    border: "#E2E8F0",
    borderLight: "#F7FAFC",
    shadow: "rgba(0, 0, 0, 0.1)",
    accent: "#E3646E",
  },

  // Dark theme colors (improved)
  dark: {
    background: "#0F1419",
    surface: "#1A202C",
    surfaceElevated: "#2D3748",
    text: "#F7FAFC",
    textSecondary: "#CBD5E0",
    textMuted: "#A0AEC0",
    border: "#4A5568",
    borderLight: "#2D3748",
    shadow: "rgba(0, 0, 0, 0.5)",
    accent: "#E3646E",
  },
};

export const createTheme = (mode: "light" | "dark") => ({
  colors: {
    // Brand colors
    mainRed: baseColors.mainRed,
    mainGreen: baseColors.mainGreen,
    mainPurple: baseColors.mainPurple,
    mainBlue: baseColors.mainBlue,
    mainYellow: baseColors.mainYellow,

    // Theme-specific colors
    background: baseColors[mode].background,
    surface: baseColors[mode].surface,
    surfaceElevated: baseColors[mode].surfaceElevated,
    text: baseColors[mode].text,
    textSecondary: baseColors[mode].textSecondary,
    textMuted: baseColors[mode].textMuted,
    border: baseColors[mode].border,
    borderLight: baseColors[mode].borderLight,
    shadow: baseColors[mode].shadow,
    accent: baseColors[mode].accent,

    // Legacy color names for backward compatibility
    baseGray500: baseColors[mode].background,
    baseGray400: baseColors[mode].surface,
    baseGray100: baseColors[mode].text,
    baseGray200: baseColors[mode].textSecondary,
    baseGray300: baseColors[mode].textMuted,
  },
  fonts: {
    inconsolata: "Inconsolata, -apple-system, Roboto, Helvetica, sans-serif",
    asap: "Asap, -apple-system, Roboto, Helvetica, sans-serif",
    mavenPro: "Maven Pro, -apple-system, Roboto, Helvetica, sans-serif",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
    "5xl": "48px",
    "6xl": "56px",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    tight: "120%",
    normal: "140%",
  },
  radii: {
    sm: "8px",
    md: "12px",
    full: "999px",
    round: "9999px",
  },
  space: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    14: "56px",
    16: "64px",
    18: "72px",
    20: "80px",
    24: "96px",
    28: "112px",
    32: "128px",
    36: "144px",
    40: "160px",
    44: "176px",
    48: "192px",
    50: "200px",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  transitions: {
    fast: "0.15s ease",
    normal: "0.2s ease",
    slow: "0.3s ease",
  },
  shadows: {
    sm: `0 2px 4px ${baseColors[mode].shadow}`,
    md: `0 4px 8px ${baseColors[mode].shadow}`,
    lg: `0 8px 16px ${baseColors[mode].shadow}`,
    xl: `0 12px 24px ${baseColors[mode].shadow}`,
  },
  mode,
});

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");

export type Theme = ReturnType<typeof createTheme>;
export type ThemeMode = "light" | "dark";
