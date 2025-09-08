import React from "react";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";

interface ThemeToggleProps {
  standalone?: boolean;
}

const ToggleButton = styled.button<{ $standalone?: boolean }>`
  ${({ $standalone }) =>
    $standalone
      ? `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 1001;
  `
      : `
    position: relative;
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;

    ${({ $standalone }) =>
      $standalone &&
      `
      top: 20px;
      right: 20px;
    `}
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transitions.normal};
`;

const SunIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1V3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21V23"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.22 4.22L5.64 5.64"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.36 18.36L19.78 19.78"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 12H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H23"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.22 19.78L5.64 18.36"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.36 5.64L19.78 4.22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StyledIcon = styled.div<{ $isLight: boolean }>`
  color: ${({ theme, $isLight }) =>
    $isLight ? theme.colors.mainYellow : theme.colors.mainBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.normal};
`;

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  standalone = false,
}) => {
  const { mode, toggleTheme } = useTheme();
  const isLight = mode === "light";

  return (
    <ToggleButton
      $standalone={standalone}
      onClick={toggleTheme}
      title={`Alternar para tema ${isLight ? "escuro" : "claro"}`}
      aria-label={`Alternar para tema ${isLight ? "escuro" : "claro"}`}
    >
      <IconWrapper>
        <StyledIcon $isLight={isLight}>
          {isLight ? <MoonIcon /> : <SunIcon />}
        </StyledIcon>
      </IconWrapper>
    </ToggleButton>
  );
};
