import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FloatingNav = styled.nav<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $isVisible }) => $isVisible ? '0' : '100px'});
  z-index: 1000;
  background: ${({ theme }) => theme.colors.background}95;
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  padding: 12px 24px;
  display: flex;
  gap: 8px;
  transition: all 0.3s ease;
  opacity: ${({ $isVisible }) => $isVisible ? '1' : '0'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    bottom: 20px;
    padding: 10px 20px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    gap: 4px;
  }
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.mainRed : 'transparent'};
  border: none;
  color: ${({ theme, $isActive }) => 
    $isActive ? 'white' : theme.colors.textSecondary};
  padding: 8px 16px;
  border-radius: 25px;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme, $isActive }) => 
      $isActive ? theme.colors.mainRed : `${theme.colors.mainRed}20`};
    color: ${({ theme, $isActive }) => 
      $isActive ? 'white' : theme.colors.mainRed};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
`;

interface NavigationItem {
  id: string;
  label: string;
  sectionId: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Início', sectionId: 'hero' },
  { id: 'projects', label: 'Projetos', sectionId: 'projetos' },
  { id: 'experiences', label: 'Experiências', sectionId: 'experiencias' },
  { id: 'contact', label: 'Contato', sectionId: 'contato' },
];

export const FloatingNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling a bit
      setIsVisible(window.scrollY > 300);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => ({
        id: item.sectionId,
        element: document.getElementById(item.sectionId)
      })).filter(section => section.element);

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FloatingNav $isVisible={isVisible}>
      {navigationItems.map((item) => (
        <NavButton
          key={item.id}
          $isActive={activeSection === item.sectionId}
          onClick={() => scrollToSection(item.sectionId)}
        >
          {item.label}
        </NavButton>
      ))}
    </FloatingNav>
  );
};
