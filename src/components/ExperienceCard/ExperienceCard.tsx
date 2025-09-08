import React from "react";
import styled from "styled-components";
import { FiMapPin, FiCalendar, FiBriefcase } from "react-icons/fi";
import { SocialButton } from "../SocialButton";

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  technologies: string[];
  achievements: string[];
  companyLogo: string;
  featured?: boolean;
  onClick?: () => void;
}

const CardContainer = styled.div<{ $featured?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $featured }) => 
    $featured ? theme.colors.mainBlue : theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.mainRed};
  }

  ${({ $featured, theme }) => $featured && `
    &::before {
      content: 'Destaque';
      position: absolute;
      top: -1px;
      right: 16px;
      background: ${theme.colors.mainBlue};
      color: white;
      padding: 4px 12px;
      border-radius: 0 0 8px 8px;
      font-size: 12px;
      font-weight: 600;
      font-family: ${theme.fonts.mavenPro};
    }
  `}
`;

const Header = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const CompanyLogo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const CompanyInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Position = styled.h3`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;
`;

const Company = styled.h4`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainBlue};
  margin: 0;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
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
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  background: ${({ theme, $type }) => 
    $type === 'Freelancer' 
      ? theme.colors.mainGreen + '20'
      : theme.colors.mainBlue + '20'
  };
  color: ${({ theme, $type }) => 
    $type === 'Freelancer' 
      ? theme.colors.mainGreen
      : theme.colors.mainBlue
  };
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 16px 0;
`;

const Section = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h5`
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AchievementItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-left: 16px;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.mainGreen};
    font-weight: bold;
  }
`;

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  position,
  period,
  duration,
  location,
  type,
  description,
  technologies,
  achievements,
  companyLogo,
  featured = false,
  onClick
}) => {
  return (
    <CardContainer $featured={featured} onClick={onClick}>
      <Header>
        <CompanyLogo src={companyLogo} alt={`${company} logo`} />
        <CompanyInfo>
          <Position>{position}</Position>
          <Company>{company}</Company>
        </CompanyInfo>
      </Header>

      <MetaInfo>
        <MetaItem>
          <FiCalendar />
          {period} • {duration}
        </MetaItem>
        <MetaItem>
          <FiMapPin />
          {location}
        </MetaItem>
        <MetaItem>
          <FiBriefcase />
          <TypeBadge $type={type}>{type}</TypeBadge>
        </MetaItem>
      </MetaInfo>

      <Description>{description}</Description>

      <Section>
        <SectionTitle>Tecnologias</SectionTitle>
        <TechList>
          {technologies.map((tech, index) => (
            <SocialButton key={`${tech}-${index}`} size="sm" type={tech as any}>
              {tech}
            </SocialButton>
          ))}
        </TechList>
      </Section>

      <Section>
        <SectionTitle>Principais Conquistas</SectionTitle>
        <AchievementList>
          {achievements.slice(0, 3).map((achievement, index) => (
            <AchievementItem key={index}>{achievement}</AchievementItem>
          ))}
        </AchievementList>
      </Section>
    </CardContainer>
  );
};
