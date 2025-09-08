import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemeToggle } from "../ThemeToggle";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: ${({ theme }) => theme.colors.background}95;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 32px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60px;
  }
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.mainRed},
    ${({ theme }) => theme.colors.mainPurple}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const ScrollLink = styled.a<{ $isActive: boolean }>`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.mainRed : theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ theme, $isActive }) =>
    $isActive ? `${theme.colors.mainRed}10` : "transparent"};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.mainRed};
    background: ${({ theme }) => theme.colors.mainRed}10;
    transform: translateY(-1px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 2px;
    background: ${({ theme }) => theme.colors.mainRed};
    transition: width 0.3s ease;
  }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.mainRed : theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ theme, $isActive }) =>
    $isActive ? `${theme.colors.mainRed}10` : "transparent"};

  &:hover {
    color: ${({ theme }) => theme.colors.mainRed};
    background: ${({ theme }) => theme.colors.mainRed}10;
    transform: translateY(-1px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 2px;
    background: ${({ theme }) => theme.colors.mainRed};
    transition: width 0.3s ease;
  }

  @media (max-width: 640px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
`;

const ThemeToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 70;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <HeaderContainer>
      <Logo to="/">Kauan.dev</Logo>

      <Navigation>
        <NavLinks>
          <NavLink to="/" $isActive={location.pathname === "/"}>
            Home
          </NavLink>
          {isHomePage && (
            <>
              <ScrollLink
                $isActive={false}
                onClick={() => scrollToSection("projetos")}
              >
                Projetos
              </ScrollLink>
              <ScrollLink
                $isActive={false}
                onClick={() => scrollToSection("experiencias")}
              >
                Experiências
              </ScrollLink>
              <ScrollLink
                $isActive={false}
                onClick={() => scrollToSection("contato")}
              >
                Contato
              </ScrollLink>
            </>
          )}
          <NavLink
            to="/assistant"
            $isActive={location.pathname === "/assistant"}
          >
            AI Assistant
          </NavLink>
        </NavLinks>

        <ThemeToggleWrapper>
          <ThemeToggle />
        </ThemeToggleWrapper>
      </Navigation>
    </HeaderContainer>
  );
};
