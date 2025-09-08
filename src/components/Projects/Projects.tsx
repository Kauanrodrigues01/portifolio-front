import React, { useState } from "react";
import styled from "styled-components";
import projectsData from "../../data/projects.json";
import { ProjectCard } from "../ProjectCard";
import { ProjectDetails, ProjectModal } from "../ProjectModal";

const ProjectsSection = styled.section`
  display: flex;
  padding: 100px 32px 120px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  align-self: stretch;
  position: relative;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 1024px) {
    padding: 80px 24px 100px 24px;
    gap: 60px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px 80px 20px;
    gap: 50px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  position: relative;
  text-align: center;
`;

const SectionTag = styled.div`
  color: ${({ theme }) => theme.colors.mainRed};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.inconsolata};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  line-height: 120%;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  font-weight: 700;
  line-height: 120%;
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  width: 100%;
  max-width: 1200px;
  gap: 32px;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: ProjectDetails) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for animation
  };

  return (
    <>
      <ProjectsSection>
        <HeaderContainer>
          <SectionTag>Meu trabalho</SectionTag>
          <SectionTitle>Veja os projetos em destaque</SectionTitle>
        </HeaderContainer>
        <GridContainer>
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies as any}
              onClick={() => handleProjectClick(project as any)}
            />
          ))}
        </GridContainer>
      </ProjectsSection>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
