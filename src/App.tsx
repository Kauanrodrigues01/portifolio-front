import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { Header } from "./components/Header";
import { MobileEnhancements } from "./components/MobileEnhancements";
import { ScrollToTop } from "./components/ScrollToTop";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useMobileScroll, useMobileViewport } from "./hooks/useTouchGestures";
import {
  AssistantPage,
  ExperienceDetailsPage,
  HomePage,
  ProjectDetailsPage,
} from "./pages";
import { GlobalStyles } from "./styles/GlobalStyles";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  min-height: 100vh;
  margin: 0 auto;

  /* Use CSS custom property for mobile viewport height */
  min-height: calc(var(--vh, 1vh) * 100);
`;

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  // Initialize mobile optimizations
  useMobileScroll();
  useMobileViewport();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <MobileEnhancements>
          <AppContainer>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/projeto/:id" element={<ProjectDetailsPage />} />
              <Route
                path="/experiencia/:id"
                element={<ExperienceDetailsPage />}
              />
            </Routes>
          </AppContainer>
        </MobileEnhancements>
      </Router>
    </StyledThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
