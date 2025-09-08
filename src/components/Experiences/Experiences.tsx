import React from "react";
import { FiBriefcase } from "react-icons/fi";
import styled from "styled-components";
import experiencesData from "../../data/experiences.json";
import { ExperienceCard } from "../ExperienceCard";

const ExperiencesSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 60px 20px;

  @media (max-width: 768px) {
    padding: 60px 16px 40px 16px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  svg {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  }
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ExperiencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const TimelineIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  gap: 12px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const TimelineLine = styled.div`
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${({ theme }) => theme.colors.mainBlue} 50%,
    transparent 100%
  );
  flex: 1;
  max-width: 120px;
`;

const TimelineText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainBlue};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ExperienceSection = styled.div<{ $featured?: boolean }>`
  ${({ $featured }) =>
    $featured &&
    `
    grid-column: 1 / -1;
    
    @media (max-width: 768px) {
      grid-column: 1;
    }
  `}
`;

export const Experiences: React.FC = () => {
  // Usar experiências na ordem do JSON (já ordenadas)
  const experiences = experiencesData;

  const handleExperienceClick = (experienceId: number) => {
    // Futuramente podemos implementar um modal ou página de detalhes
    console.log(`Clicked experience: ${experienceId}`);
  };

  return (
    <ExperiencesSection id="experiencias">
      <Container>
        <SectionHeader>
          <IconWrapper>
            <FiBriefcase />
          </IconWrapper>
          <Title>Experiência Profissional</Title>
          <Subtitle>
            Minha jornada profissional e as principais experiências que
            contribuíram para meu crescimento como desenvolvedor
          </Subtitle>
        </SectionHeader>

        <TimelineIndicator>
          <TimelineLine />
          <TimelineText>Timeline Profissional</TimelineText>
          <TimelineLine />
        </TimelineIndicator>

        <ExperiencesGrid>
          {experiences.map((experience) => (
            <ExperienceSection
              key={experience.id}
              $featured={experience.featured}
            >
              <ExperienceCard
                company={experience.company}
                position={experience.position}
                period={experience.period}
                duration={experience.duration}
                location={experience.location}
                type={experience.type}
                description={experience.description}
                technologies={experience.technologies}
                achievements={experience.achievements}
                companyLogo={experience.companyLogo}
                featured={experience.featured}
                onClick={() => handleExperienceClick(experience.id)}
              />
            </ExperienceSection>
          ))}
        </ExperiencesGrid>
      </Container>
    </ExperiencesSection>
  );
};
