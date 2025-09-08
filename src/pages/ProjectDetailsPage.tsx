import React from "react";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { SocialButton } from "../components/SocialButton";
import projectsData from "../data/projects.json";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 90px 20px 20px 20px; /* Padding top ajustado para o header fixo */
  gap: 32px;

  @media (max-width: 768px) {
    padding: 80px 16px 16px 16px; /* Ajustado para header mobile */
    gap: 24px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: fixed;
  top: 90px;
  left: 20px;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.md};
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.colors.surface}ee;

  @media (max-width: 768px) {
    top: 80px;
    left: 16px;
    padding: 10px 16px;
    font-size: 12px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.mainBlue};
    color: white;
    border-color: ${({ theme }) => theme.colors.mainBlue};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ProjectTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const MetaItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    color: ${({ theme }) => theme.colors.text};
    margin-right: 8px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 4px;
    height: 20px;
    background: ${({ theme }) => theme.colors.mainBlue};
    border-radius: 2px;
  }
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeatureItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-left: 24px;
  position: relative;

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.mainGreen};
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;

  &.primary {
    background: ${({ theme }) => theme.colors.mainBlue};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.colors.mainRed};
    }
  }

  &.secondary {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      background: ${({ theme }) => theme.colors.border};
    }
  }
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 16px;

  h2 {
    font-family: ${({ theme }) => theme.fonts.asap};
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  p {
    font-family: ${({ theme }) => theme.fonts.mavenPro};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }
`;

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === Number(id));

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLiveUrlClick = () => {
    if (project?.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleGithubClick = () => {
    if (project?.githubUrl) {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!project) {
    return (
      <PageContainer>
        <BackButton onClick={handleBackClick}>
          <FiArrowLeft />
          Voltar
        </BackButton>
        <NotFound>
          <h2>Projeto não encontrado</h2>
          <p>O projeto que você está procurando não existe ou foi removido.</p>
        </NotFound>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton onClick={handleBackClick}>
        <FiArrowLeft />
        Voltar
      </BackButton>

      <ProjectHeader>
        <ProjectImage src={project.image} alt={project.title} />
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectMeta>
          <MetaItem>
            <strong>Categoria:</strong> {project.category}
          </MetaItem>
          <MetaItem>
            <strong>Ano:</strong> {project.year}
          </MetaItem>
          <MetaItem>
            <strong>Duração:</strong> {project.duration}
          </MetaItem>
        </ProjectMeta>
      </ProjectHeader>

      <ContentWrapper>
        <Section>
          <SectionTitle>Sobre o Projeto</SectionTitle>
          <Description>{project.fullDescription}</Description>
        </Section>

        <Section>
          <SectionTitle>Tecnologias</SectionTitle>
          <TechStack>
            {project.technologies.map((tech, index) => (
              <SocialButton
                key={`${tech}-${index}`}
                size="sm"
                type={tech as any}
              >
                {tech === "JS" ? "Javascript" : tech}
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
            <ActionButton className="primary" onClick={handleLiveUrlClick}>
              <FiExternalLink />
              Ver Projeto
            </ActionButton>
          )}
          {project.githubUrl && (
            <ActionButton className="secondary" onClick={handleGithubClick}>
              <FiGithub />
              Ver Código
            </ActionButton>
          )}
        </ActionButtons>
      </ContentWrapper>
    </PageContainer>
  );
};
