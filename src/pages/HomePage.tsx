import React from "react";
import styled from "styled-components";
import { Contact } from "../components/Contact";
import { Experiences } from "../components/Experiences";
import { FloatingNavigation } from "../components/FloatingNavigation";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";

const PageContainer = styled.div`
  padding-top: 70px; // Espaço para o header fixo

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

export const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Hero />
      <Projects />
      <Experiences />
      <Contact />
      <FloatingNavigation />
    </PageContainer>
  );
};
