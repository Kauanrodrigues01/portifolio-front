import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SocialButton, ButtonType } from '../SocialButton';

export interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  technologies: ButtonType[];
  features: string[];
  challenges: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  year: string;
  duration: string;
}

interface ProjectModalProps {
  project: ProjectDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all ${({ theme }) => theme.transitions.normal};
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
    align-items: flex-start;
    padding-top: 60px;
  }
`;

const ModalContent = styled.div<{ $isOpen: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: transform ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.xl};

  @media (max-width: 768px) {
    max-height: calc(100vh - 120px);
    border-radius: 12px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceElevated};
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;

  @media (max-width: 768px) {
    height: 200px;
    border-radius: 12px 12px 0 0;
  }
`;

const ContentWrapper = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const ProjectTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const MetaItem = styled.span`
  font-family: ${({ theme }) => theme.fonts.inconsolata};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  
  strong {
    color: ${({ theme }) => theme.colors.mainRed};
  }
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
`;

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 4px;
    height: 18px;
    background: ${({ theme }) => theme.colors.mainBlue};
    border-radius: 2px;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 0;
  padding-left: 24px;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.mainGreen};
    font-weight: bold;
  }
`;

const TechStack = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.inconsolata};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background: ${theme.colors.mainBlue};
        color: ${theme.colors.background};
        border: none;
        
        &:hover {
          background: ${theme.colors.mainBlue};
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `
      : `
        background: transparent;
        color: ${theme.colors.textSecondary};
        border: 1px solid ${theme.colors.border};
        
        &:hover {
          background: ${theme.colors.surfaceElevated};
          border-color: ${theme.colors.borderLight};
        }
      `}
`;

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLiveUrlClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  };

  const handleGithubClick = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent $isOpen={isOpen}>
        <CloseButton onClick={onClose} aria-label="Fechar modal">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CloseButton>

        <ProjectImage src={project.image} alt={project.title} />

        <ContentWrapper>
          <Header>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectMeta>
              <MetaItem><strong>Categoria:</strong> {project.category}</MetaItem>
              <MetaItem><strong>Ano:</strong> {project.year}</MetaItem>
              <MetaItem><strong>Duração:</strong> {project.duration}</MetaItem>
            </ProjectMeta>
            <Description>{project.fullDescription}</Description>
          </Header>

          <Section>
            <SectionTitle>Tecnologias</SectionTitle>
            <TechStack>
              {project.technologies.map((tech, index) => (
                <SocialButton key={`${tech}-${index}`} size="sm" type={tech}>
                  {tech === 'JS' ? 'Javascript' : tech}
                </SocialButton>
              ))}
            </TechStack>
          </Section>

          <Section>
            <SectionTitle>Principais Funcionalidades</SectionTitle>
            <FeatureList>
              {project.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeatureList>
          </Section>

          <Section>
            <SectionTitle>Desafios e Soluções</SectionTitle>
            <FeatureList>
              {project.challenges.map((challenge, index) => (
                <FeatureItem key={index}>{challenge}</FeatureItem>
              ))}
            </FeatureList>
          </Section>

          <ActionButtons>
            {project.liveUrl && (
              <ActionButton $variant="primary" onClick={handleLiveUrlClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3h6v6M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ver Projeto
              </ActionButton>
            )}
            {project.githubUrl && (
              <ActionButton $variant="secondary" onClick={handleGithubClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ver Código
              </ActionButton>
            )}
          </ActionButtons>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};
