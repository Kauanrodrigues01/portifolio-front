import React from "react";
import styled from "styled-components";
import fotoPerfilImg from "../../assets/foto-perfil.jpg";
import { ButtonType, SocialButton } from "../SocialButton";

const HeroSection = styled.section`
  display: flex;
  padding: 80px 32px 120px 32px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        ${({ theme }) => theme.colors.mainRed}15 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        ${({ theme }) => theme.colors.mainBlue}15 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        ${({ theme }) => theme.colors.mainPurple}10 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    padding: 60px 24px 80px 24px;
    min-height: 90vh;
  }

  @media (max-width: 768px) {
    padding: 40px 20px 60px 20px;
    min-height: 80vh;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 32px;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  width: 140px;
  height: 140px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.mainRed},
    ${({ theme }) => theme.colors.mainPurple}
  );
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const UserContainer = styled.div`
  width: 132px;
  height: 132px;
  flex-shrink: 0;
  position: absolute;
  left: 4px;
  top: 4px;

  @media (max-width: 768px) {
    width: 112px;
    height: 112px;
  }
`;

const AvatarImage = styled.img`
  width: 132px;
  height: 132px;
  flex-shrink: 0;
  border-radius: 50%;
  position: absolute;
  left: 4px;
  top: 4px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    width: 112px;
    height: 112px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  position: relative;
`;

const IntroText = styled.div`
  align-self: stretch;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.inconsolata};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
  line-height: 140%;
  position: relative;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const NameSpan = styled.span`
  color: ${({ theme }) => theme.colors.mainRed};
`;

const RegularSpan = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MainTitle = styled.h1`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.asap};
  font-size: ${({ theme }) => theme.fontSizes["6xl"]};
  font-weight: 700;
  line-height: 110%;
  margin: 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text},
    ${({ theme }) => theme.colors.mainRed}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }
`;

const Description = styled.p`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
  line-height: 150%;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
    max-width: 500px;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 640px) {
    gap: 8px;
  }
`;

const technologies: { type: ButtonType; label: string }[] = [
  { type: "Python", label: "Python" },
  { type: "Javascript", label: "JavaScript" },
  { type: "TypeScript", label: "TypeScript" },
  { type: "React", label: "React" },
  { type: "Django", label: "Django" },
  { type: "FastAPI", label: "FastAPI" },
  { type: "NestJs", label: "NestJS" },
  { type: "Postgresql", label: "PostgreSQL" },
  { type: "Redis", label: "Redis" },
];

export const Hero: React.FC = () => {
  return (
    <HeroSection id="hero">
      <InfoContainer>
        <HeaderContainer>
          <AvatarWrapper>
            <UserContainer>
              <AvatarImage src={fotoPerfilImg} alt="Kauan Rodrigues" />
            </UserContainer>
          </AvatarWrapper>
          <TextContainer>
            <TitleContainer>
              <IntroText>
                <RegularSpan>Hello World! Meu nome é </RegularSpan>
                <NameSpan>Kauan Rodrigues</NameSpan>
                <RegularSpan> e sou</RegularSpan>
              </IntroText>
              <MainTitle>Desenvolvedor Full Stack</MainTitle>
            </TitleContainer>
            <Description>
              Transformo necessidades em aplicações reais, evolventes e
              funcionais. Desenvolvo sistemas através da minha paixão pela
              tecnologia, contribuindo com soluções inovadoras e eficazes para
              desafios complexos.
            </Description>
          </TextContainer>
        </HeaderContainer>
        <TagsContainer>
          {technologies.map((tech) => (
            <SocialButton key={tech.type} size="md" type={tech.type}>
              {tech.label}
            </SocialButton>
          ))}
        </TagsContainer>
      </InfoContainer>
    </HeroSection>
  );
};
