import React from "react";
import styled from "styled-components";
import { ButtonType, SocialButton } from "../SocialButton";

export type ProjectStatus = "Default";

interface ProjectCardProps {
  status?: ProjectStatus;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  technologies: ButtonType[];
  onClick?: () => void;
  href?: string;
}

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.mainRed};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }
`;

const ProjectImage = styled.img`
  width: 240px;
  height: 180px;
  flex-shrink: 0;
  border-radius: 12px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 200px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  padding: 8px 4px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  gap: 16px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Title = styled.h3`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  line-height: 120%;
  margin: 0;
`;

const DescriptionText = styled.p`
  align-self: stretch;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-overflow: ellipsis;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  line-height: 150%;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  technologies,
  onClick,
  href,
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <ProjectImage src={image} alt={imageAlt || title} />
      <ContentWrapper>
        <Description>
          <Title>{title}</Title>
          <DescriptionText>{description}</DescriptionText>
        </Description>
        <TagsContainer>
          {technologies.map((tech, index) => (
            <SocialButton key={`${tech}-${index}`} size="sm" type={tech}>
              {tech === "JS" ? "Javascript" : tech}
            </SocialButton>
          ))}
        </TagsContainer>
      </ContentWrapper>
    </CardContainer>
  );
};
