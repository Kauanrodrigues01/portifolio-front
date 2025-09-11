import React, { useState } from "react";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCalendar,
  FiExternalLink,
  FiMapPin,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { SocialButton } from "../components/SocialButton";
import experiencesData from "../data/experiences.json";
import { processExperienceData } from "../utils/dateUtils";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 90px 20px 20px 20px;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 80px 16px 16px 16px;
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

const ExperienceHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const CompanySection = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const CompanyLogo = styled.img<{ $hasError?: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
  display: ${({ $hasError }) => ($hasError ? "none" : "block")};
  box-shadow: ${({ theme }) => theme.shadows.md};

  @media (max-width: 640px) {
    width: 80px;
    height: 80px;
  }
`;

const DefaultLogo = styled.div<{ $show?: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.mainBlue}20,
    ${({ theme }) => theme.colors.mainBlue}40
  );
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.md};

  svg {
    width: 48px;
    height: 48px;
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  @media (max-width: 640px) {
    width: 80px;
    height: 80px;

    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Position = styled.h1`
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

const Company = styled.h2`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainBlue};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ExperienceMeta = styled.div`
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const TypeBadge = styled.span<{ $type: string }>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  background: ${({ theme, $type }) =>
    $type === "Freelancer"
      ? theme.colors.mainGreen + "20"
      : theme.colors.mainBlue + "20"};
  color: ${({ theme, $type }) =>
    $type === "Freelancer" ? theme.colors.mainGreen : theme.colors.mainBlue};
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

const SectionTitle = styled.h3`
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

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-left: 24px;
  position: relative;
  line-height: 1.5;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.mainBlue};
    font-weight: bold;
    font-size: 16px;
  }

  &.achievement::before {
    content: "✓";
    color: ${({ theme }) => theme.colors.mainGreen};
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

const ActionButton = styled.button`
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
  border: none;

  &.primary {
    background: ${({ theme }) => theme.colors.mainBlue};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.colors.mainRed};
      transform: translateY(-2px);
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

export const ExperienceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Processar experiências para calcular automaticamente period e duration
  const processedExperiences = experiencesData.map(processExperienceData);
  const experience = processedExperiences.find((exp) => exp.id === Number(id));

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleLinkedInClick = () => {
    // Link para o perfil do LinkedIn (você pode personalizar)
    window.open(
      "https://linkedin.com/in/kauan-rodrigues-lima",
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!experience) {
    return (
      <PageContainer>
        <BackButton onClick={handleBackClick}>
          <FiArrowLeft />
          Voltar
        </BackButton>
        <NotFound>
          <h2>Experiência não encontrada</h2>
          <p>
            A experiência que você está procurando não existe ou foi removida.
          </p>
        </NotFound>
      </PageContainer>
    );
  }

  // Verificar se deve mostrar logo padrão
  const shouldShowDefault =
    !experience.companyLogo ||
    experience.companyLogo.trim() === "" ||
    imageError;

  return (
    <PageContainer>
      <BackButton onClick={handleBackClick}>
        <FiArrowLeft />
        Voltar
      </BackButton>

      <ExperienceHeader>
        <CompanySection>
          {shouldShowDefault ? (
            <DefaultLogo $show={true}>
              <FiBriefcase />
            </DefaultLogo>
          ) : (
            <CompanyLogo
              src={experience.companyLogo}
              alt={`${experience.company} logo`}
              onError={handleImageError}
              $hasError={imageError}
            />
          )}

          <CompanyInfo>
            <Position>{experience.position}</Position>
            <Company>{experience.company}</Company>
          </CompanyInfo>
        </CompanySection>

        <ExperienceMeta>
          <MetaItem>
            <FiCalendar />
            {experience.period} • {experience.duration}
          </MetaItem>
          <MetaItem>
            <FiMapPin />
            {experience.location}
          </MetaItem>
          <MetaItem>
            <FiBriefcase />
            <TypeBadge $type={experience.type}>{experience.type}</TypeBadge>
          </MetaItem>
        </ExperienceMeta>
      </ExperienceHeader>

      <ContentWrapper>
        <Section>
          <SectionTitle>Sobre a Experiência</SectionTitle>
          <Description>{experience.description}</Description>
        </Section>

        <Section>
          <SectionTitle>Principais Responsabilidades</SectionTitle>
          <List>
            {experience.responsibilities.map(
              (responsibility: string, index: number) => (
                <ListItem key={index}>{responsibility}</ListItem>
              )
            )}
          </List>
        </Section>

        <Section>
          <SectionTitle>Tecnologias Utilizadas</SectionTitle>
          <TechStack>
            {experience.technologies.map((tech: string, index: number) => (
              <SocialButton
                key={`${tech}-${index}`}
                size="sm"
                type={tech as any}
              >
                {tech}
              </SocialButton>
            ))}
          </TechStack>
        </Section>

        <Section>
          <SectionTitle>Principais Conquistas e Resultados</SectionTitle>
          <List>
            {experience.achievements.map(
              (achievement: string, index: number) => (
                <ListItem key={index} className="achievement">
                  {achievement}
                </ListItem>
              )
            )}
          </List>
        </Section>

        <ActionButtons>
          <ActionButton className="primary" onClick={handleLinkedInClick}>
            <FiExternalLink />
            Ver no LinkedIn
          </ActionButton>
        </ActionButtons>
      </ContentWrapper>
    </PageContainer>
  );
};
