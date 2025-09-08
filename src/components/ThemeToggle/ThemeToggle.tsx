import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
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

const StyledIcon = styled.div<{ $isLight: boolean }>`
  color: ${({ theme, $isLight }) =>
    $isLight ? theme.colors.mainYellow : theme.colors.mainBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.normal};
  font-size: 20px;
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
          {isLight ? <FiMoon /> : <FiSun />}
        </StyledIcon>
      </IconWrapper>
    </ToggleButton>
  );
};
