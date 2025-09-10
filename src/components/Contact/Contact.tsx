import React from "react";
import styled from "styled-components";
import { SocialButton } from "../SocialButton";

const ContactSection = styled.section`
  display: flex;
  padding: 100px 32px 120px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  align-self: stretch;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 70% 30%,
        ${({ theme }) => theme.colors.mainPurple}15 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 30% 70%,
        ${({ theme }) => theme.colors.mainBlue}15 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    padding: 80px 24px 100px 24px;
    gap: 50px;
  }

  @media (max-width: 768px) {
    padding: 60px 20px 80px 20px;
    gap: 40px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  position: relative;
  text-align: center;
  z-index: 1;
  max-width: 600px;
`;

const SectionTag = styled.div`
  color: ${({ theme }) => theme.colors.mainPurple};
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

const SectionDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 400;
  line-height: 150%;
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    align-items: stretch;
  }
`;

interface SocialLink {
  id: number;
  label: string;
  href: string;
  type: "LinkedIn" | "Instagram" | "GitHub" | "Email";
}

const socialLinks: SocialLink[] = [
  {
    id: 1,
    label: "Linkedin",
    href: "https://www.linkedin.com/in/kauan-rodrigues-lima/",
    type: "LinkedIn",
  },
  {
    id: 2,
    label: "Instagram",
    href: "https://instagram.com/kauan_mrl/",
    type: "Instagram",
  },
  {
    id: 3,
    label: "GitHub",
    href: "https://github.com/Kauanrodrigues01",
    type: "GitHub",
  },
  {
    id: 4,
    label: "E-mail",
    href: "mailto:kauanrl09@gmail.com",
    type: "Email",
  },
];

export const Contact: React.FC = () => {
  return (
    <ContactSection id="contato">
      <HeaderContainer>
        <SectionTag>Contato</SectionTag>
        <SectionTitle>Gostou do meu trabalho?</SectionTitle>
        <SectionDescription>
          Entre em contato ou acompanhe as minhas redes sociais!
        </SectionDescription>
      </HeaderContainer>
      <LinksContainer>
        {socialLinks.map((link) => (
          <SocialButton
            key={link.id}
            size="md"
            type={link.type}
            fullWidth
            showArrow
            href={link.href}
          >
            {link.label}
          </SocialButton>
        ))}
      </LinksContainer>
    </ContactSection>
  );
};
