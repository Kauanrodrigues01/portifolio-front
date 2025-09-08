import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --Base-gray-500: ${({ theme }) => theme.colors.background};
    --Main-Red: ${({ theme }) => theme.colors.mainRed};
    --Base-gray-100: ${({ theme }) => theme.colors.text};
    --Base-gray-300: ${({ theme }) => theme.colors.textMuted};
    --Main-Green: ${({ theme }) => theme.colors.mainGreen};
    --Main-Purple: ${({ theme }) => theme.colors.mainPurple};
    --Main-Blue: ${({ theme }) => theme.colors.mainBlue};
    --Main-Yellow: ${({ theme }) => theme.colors.mainYellow};
    --Base-gray-400: ${({ theme }) => theme.colors.surface};
    --Base-gray-200: ${({ theme }) => theme.colors.textSecondary};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Maven Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color ${({ theme }) => theme.transitions.normal}, 
                color ${({ theme }) => theme.transitions.normal};
    
    /* Prevent flash of unstyled content */
    visibility: visible;
    opacity: 1;
    font-weight: 400;
  }

  /* Smooth theme transitions */
  * {
    transition: background-color ${({ theme }) => theme.transitions.normal}, 
                color ${({ theme }) => theme.transitions.normal},
                border-color ${({ theme }) => theme.transitions.normal},
                box-shadow ${({ theme }) => theme.transitions.normal};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.mainRed};
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.mainPurple};
  }

  /* Focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.mainRed};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Smooth transitions for mobile interactions */
  @media (max-width: 768px) {
    * {
      -webkit-tap-highlight-color: transparent;
    }
    
    button {
      touch-action: manipulation;
      min-height: 44px; /* Accessibility: minimum touch target */
    }
  }

  /* Selection styling */
  ::selection {
    background: ${({ theme }) => theme.colors.mainRed}30;
    color: ${({ theme }) => theme.colors.text};
  }

  ::-moz-selection {
    background: ${({ theme }) => theme.colors.mainRed}30;
    color: ${({ theme }) => theme.colors.text};
  }

  /* Loading states */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Improved link styles */
  a {
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.mainRed};
  }
`;
