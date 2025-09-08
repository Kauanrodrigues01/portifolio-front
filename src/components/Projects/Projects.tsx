import React, { useState } from "react";
import styled from "styled-components";
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

const projectsData: ProjectDetails[] = [
  {
    id: 1,
    title: "Travelgram",
    description:
      "Rede social onde as pessoas mostram os registros de suas viagens pelo mundo",
    fullDescription:
      "Travelgram é uma plataforma social inovadora que permite aos usuários compartilhar suas experiências de viagem através de fotos, histórias e avaliações. O projeto inclui sistema de autenticação, feed personalizado, geolocalização e interações sociais.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop",
    technologies: ["PHP", "CSS", "HTML", "JS"],
    features: [
      "Sistema de autenticação e perfis de usuário",
      "Upload e compartilhamento de fotos com geolocalização",
      "Feed personalizado baseado em interesses",
      "Sistema de avaliações e comentários",
      "Mapa interativo com pins de destinos",
      "Notificações em tempo real",
    ],
    challenges: [
      "Implementação de geolocalização precisa para fotos",
      "Otimização de carregamento de imagens em alta resolução",
      "Sistema de recomendações baseado em machine learning",
      "Interface responsiva para diferentes dispositivos",
    ],
    category: "Rede Social",
    year: "2023",
    duration: "4 meses",
    liveUrl: "https://travelgram-demo.com",
    githubUrl: "https://github.com/martina-santos/travelgram",
  },
  {
    id: 2,
    title: "Página de receita",
    description: "Página com o passo a passo de uma receita para cupcakes",
    fullDescription:
      "Uma página web elegante e interativa que apresenta receitas culinárias de forma visual e organizada. Inclui timer integrado, conversor de medidas, lista de compras automática e modo de leitura otimizado para cozinha.",
    image:
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&h=300&fit=crop",
    technologies: ["PHP", "CSS", "HTML", "JS"],
    features: [
      "Layout responsivo e otimizado para dispositivos móveis",
      "Timer integrado para cada etapa da receita",
      "Conversor automático de medidas (métrico/imperial)",
      "Lista de ingredientes com checkbox interativo",
      "Modo noturno para melhor leitura",
      "Sistema de avaliação e comentários",
    ],
    challenges: [
      "Design intuitivo para uso durante o cozimento",
      "Implementação de timer múltiplo para diferentes etapas",
      "Otimização para telas touch em ambientes úmidos",
      "Sistema de busca avançada por ingredientes",
    ],
    category: "Website",
    year: "2023",
    duration: "2 semanas",
    liveUrl: "https://receitas-cupcakes.com",
    githubUrl: "https://github.com/martina-santos/receita-cupcakes",
  },
  {
    id: 3,
    title: "Tech News",
    description: "Homepage de um portal de notícias sobre a área de tecnologia",
    fullDescription:
      "Portal completo de notícias focado em tecnologia, inovação e startups. Apresenta sistema de CMS customizado, categorização inteligente de conteúdo, newsletter automatizada e integração com redes sociais.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=300&fit=crop",
    technologies: ["PHP", "CSS", "HTML", "JS"],
    features: [
      "CMS customizado para gestão de conteúdo",
      "Sistema de categorias e tags inteligentes",
      "Busca avançada com filtros múltiplos",
      "Newsletter automatizada",
      "Integração com APIs de redes sociais",
      "Área administrativa completa",
    ],
    challenges: [
      "Arquitetura escalável para alto volume de conteúdo",
      "SEO otimizado para melhor indexação",
      "Sistema de cache para performance",
      "Interface administrativa intuitiva",
    ],
    category: "Portal de Notícias",
    year: "2023",
    duration: "3 meses",
    liveUrl: "https://tech-news-portal.com",
    githubUrl: "https://github.com/martina-santos/tech-news",
  },
  {
    id: 4,
    title: "Refund",
    description: "Um sistema para pedido e acompanhamento de reembolso",
    fullDescription:
      "Sistema completo de gestão de reembolsos corporativos com fluxo de aprovação, integração bancária, relatórios analíticos e dashboard executivo. Inclui app mobile para funcionários e painel web para gestores.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
    technologies: ["PHP", "CSS", "HTML", "JS"],
    features: [
      "Fluxo de aprovação multi-nível configurável",
      "Upload de comprovantes com OCR automático",
      "Integração com sistemas bancários",
      "Dashboard analítico com métricas em tempo real",
      "Notificações por email e SMS",
      "Relatórios customizáveis em PDF/Excel",
    ],
    challenges: [
      "Integração segura com APIs bancárias",
      "OCR preciso para extração de dados de notas fiscais",
      "Sistema de workflow flexível e configurável",
      "Auditoria completa de todas as operações",
    ],
    category: "Sistema Corporativo",
    year: "2022",
    duration: "6 meses",
    liveUrl: "https://refund-system.com",
    githubUrl: "https://github.com/martina-santos/refund-system",
  },
  {
    id: 5,
    title: "Página de turismo",
    description:
      "Página com as principais informações para quem quer viajar para Busan",
    fullDescription:
      "Website promocional completo sobre turismo em Busan, Coreia do Sul. Inclui guia interativo da cidade, sistema de reservas, integração com clima em tempo real e recomendações personalizadas baseadas em preferências do usuário.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    technologies: ["PHP", "CSS", "HTML", "JS"],
    features: [
      "Guia interativo com mapa e pontos turísticos",
      "Sistema de reservas integrado",
      "Informações de clima em tempo real",
      "Galeria de fotos com geolocalização",
      "Recomendações personalizadas",
      "Integração com redes sociais para compartilhamento",
    ],
    challenges: [
      "Integração com APIs de clima e mapas",
      "Sistema de recomendações baseado em ML",
      "Otimização de imagens para carregamento rápido",
      "Suporte a múltiplos idiomas (KR/EN/PT)",
    ],
    category: "Website Turístico",
    year: "2022",
    duration: "2 meses",
    liveUrl: "https://visit-busan.com",
    githubUrl: "https://github.com/martina-santos/busan-tourism",
  },
  {
    id: 6,
    title: "Zingen",
    description:
      "Landing Page completa e responsiva de um aplicativo de Karaokê",
    fullDescription:
      "Landing page moderna e interativa para aplicativo de karaokê com recursos sociais. Apresenta animações suaves, seções promocionais, depoimentos de usuários e integração com app stores para download.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    technologies: ["PHP", "CSS", "HTML", "JS"],
    features: [
      "Design responsivo com animações suaves",
      "Seção de funcionalidades interativas",
      "Galeria de screenshots do aplicativo",
      "Depoimentos de usuários com carrossel",
      "Integração com App Store e Google Play",
      "Formulário de pré-cadastro com validação",
    ],
    challenges: [
      "Animações performáticas em dispositivos móveis",
      "Otimização para conversão de downloads",
      "Design atrativo para público jovem",
      "Carregamento rápido com conteúdo rico",
    ],
    category: "Landing Page",
    year: "2022",
    duration: "3 semanas",
    liveUrl: "https://zingen-app.com",
    githubUrl: "https://github.com/martina-santos/zingen-landing",
  },
];

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
              technologies={project.technologies}
              onClick={() => handleProjectClick(project)}
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
