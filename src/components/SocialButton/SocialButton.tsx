import React from "react";
import styled from "styled-components";
// Importando ícones das tecnologias
import {
  FaCss3Alt,
  FaDatabase,
  FaEnvelope,
  FaGitAlt,
  FaHtml5,
  FaInstagram,
  FaJs,
  FaLinkedin,
  FaPhp,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiBootstrap,
  SiChartdotjs,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiLangchain,
  SiNestjs,
  SiOpenai,
  SiPostgresql,
  SiRedis,
  SiSqlalchemy,
  SiSqlite,
  SiStreamlit,
  SiTypescript,
} from "react-icons/si";
import { VscJson } from "react-icons/vsc";

export type ButtonSize = "sm" | "md";
export type ButtonType =
  | "Git"
  | "PHP"
  | "CSS"
  | "HTML"
  | "JS"
  | "LinkedIn"
  | "Instagram"
  | "GitHub"
  | "Email"
  | "Python"
  | "Javascript"
  | "TypeScript"
  | "Django"
  | "Django REST Framework"
  | "FastAPI"
  | "React"
  | "NestJs"
  | "Postgresql"
  | "Redis"
  | "Docker"
  | "SQLAlchemy"
  | "Streamlit"
  | "LangChain"
  | "OpenAI"
  | "SQLite"
  | "ChromaDB"
  | "Chart.js"
  | "Bootstrap";
export type ButtonStatus = "Default";

interface SocialButtonProps {
  size?: ButtonSize;
  type?: ButtonType;
  status?: ButtonStatus;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  showArrow?: boolean;
  fullWidth?: boolean;
}

const getTechnologyIcon = (
  type: ButtonType,
  size: ButtonSize
): React.ReactNode => {
  const iconSize = size === "sm" ? 14 : 18;

  switch (type) {
    case "Git":
    case "GitHub":
      return <FaGitAlt size={iconSize} />;
    case "PHP":
      return <FaPhp size={iconSize} />;
    case "CSS":
      return <FaCss3Alt size={iconSize} />;
    case "HTML":
      return <FaHtml5 size={iconSize} />;
    case "JS":
    case "Javascript":
      return <FaJs size={iconSize} />;
    case "Python":
      return <FaPython size={iconSize} />;
    case "TypeScript":
      return <SiTypescript size={iconSize} />;
    case "React":
      return <FaReact size={iconSize} />;
    case "Django":
      return <SiDjango size={iconSize} />;
    case "Django REST Framework":
      return <SiDjango size={iconSize} />;
    case "FastAPI":
      return <SiFastapi size={iconSize} />;
    case "NestJs":
      return <SiNestjs size={iconSize} />;
    case "Postgresql":
      return <SiPostgresql size={iconSize} />;
    case "Redis":
      return <SiRedis size={iconSize} />;
    case "Docker":
      return <SiDocker size={iconSize} />;
    case "SQLAlchemy":
      return <SiSqlalchemy size={iconSize} />;
    case "Streamlit":
      return <SiStreamlit size={iconSize} />;
    case "LangChain":
      return <SiLangchain size={iconSize} />;
    case "OpenAI":
      return <SiOpenai size={iconSize} />;
    case "SQLite":
      return <SiSqlite size={iconSize} />;
    case "ChromaDB":
      return <VscJson size={iconSize} />;
    case "Chart.js":
      return <SiChartdotjs size={iconSize} />;
    case "Bootstrap":
      return <SiBootstrap size={iconSize} />;
    case "LinkedIn":
      return <FaLinkedin size={iconSize} />;
    case "Instagram":
      return <FaInstagram size={iconSize} />;
    case "Email":
      return <FaEnvelope size={iconSize} />;
    default:
      return <FaDatabase size={iconSize} />;
  }
};

const getTextColor = (type: ButtonType) => {
  switch (type) {
    case "JS":
    case "Javascript":
    case "React":
      return "#000000"; // Texto preto para fundos claros
    default:
      return "#FFFFFF"; // Texto branco para fundos escuros
  }
};

const getBackgroundColor = (type: ButtonType) => {
  switch (type) {
    case "Git":
    case "GitHub":
      return "#24292e";
    case "PHP":
      return "#BB72E9";
    case "CSS":
      return "#3996DB";
    case "HTML":
      return "#E3646E";
    case "JS":
    case "Javascript":
      return "#F7DF1E";
    case "Python":
      return "#3776AB";
    case "TypeScript":
      return "#3178C6";
    case "Django":
      return "#092E20";
    case "Django REST Framework":
      return "#c41e3a";
    case "FastAPI":
      return "#009688";
    case "React":
      return "#00D8FF";
    case "NestJs":
      return "#E0234E";
    case "Postgresql":
      return "#316192";
    case "Redis":
      return "#DC382D";
    case "Docker":
      return "#2496ED";
    case "SQLAlchemy":
      return "#D71F00";
    case "Streamlit":
      return "#FF4B4B";
    case "LangChain":
      return "#1C3C3C";
    case "OpenAI":
      return "#412991";
    case "SQLite":
      return "#003B57";
    case "ChromaDB":
      return "#FF6B6B"; // Cor coral para ChromaDB
    case "Chart.js":
      return "#FF6384"; // Cor rosa para Chart.js
    case "Bootstrap":
      return "#7952B3"; // Cor roxa oficial do Bootstrap
    case "LinkedIn":
      return "#0077B5";
    case "Instagram":
      return "#E4405F";
    case "Email":
      return "#EA4335";
    default:
      return "#292C34";
  }
};

const getPadding = (size: ButtonSize, fullWidth?: boolean) => {
  if (fullWidth) return "16px 24px";
  return size === "sm" ? "8px 16px" : "12px 20px";
};

const getFontSize = (size: ButtonSize) => {
  return size === "sm" ? "12px" : "16px";
};

const StyledButton = styled.button<{
  size: ButtonSize;
  buttonType: ButtonType;
  fullWidth?: boolean;
}>`
  background: ${(props) =>
    props.buttonType === "Instagram"
      ? "linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045)"
      : getBackgroundColor(props.buttonType)};
  color: ${(props) => getTextColor(props.buttonType)};
  border: none;
  border-radius: ${(props) => (props.fullWidth ? "12px" : "20px")};
  padding: ${(props) => getPadding(props.size, props.fullWidth)};
  font-size: ${(props) => (props.size === "sm" ? "0.875rem" : "1rem")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
    filter: brightness(1.1) saturate(1.1);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
    transition: all 0.1s ease;
  }
`;

const ButtonText = styled.span<{ $size: ButtonSize; $fullWidth?: boolean }>`
  color: #ffffff;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.inconsolata};
  font-size: ${({ $size }) => getFontSize($size)};
  font-weight: 600;
  line-height: 120%;
  flex: ${({ $fullWidth }) => ($fullWidth ? "1 0 0" : "none")};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ContactButtonText = styled.span`
  flex: 1 0 0;
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.mavenPro};
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ArrowIcon = styled.svg`
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  path {
    fill: #ffffff;
  }
`;

const IconWrapper = styled.div<{ $size: ButtonSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: ${(props) => (props.$size === "sm" ? "14px" : "18px")};
    height: ${(props) => (props.$size === "sm" ? "14px" : "18px")};
    color: inherit;
  }
`;

export const SocialButton: React.FC<SocialButtonProps> = ({
  size = "md",
  type = "Git",
  children,
  onClick,
  href,
  icon,
  showArrow = false,
  fullWidth = false,
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    if (onClick) {
      onClick();
    }
  };

  const TextComponent = fullWidth ? ContactButtonText : ButtonText;
  const technologyIcon = getTechnologyIcon(type, size);

  return (
    <StyledButton
      size={size}
      buttonType={type}
      fullWidth={fullWidth}
      onClick={handleClick}
    >
      <IconWrapper $size={size}>{icon || technologyIcon}</IconWrapper>
      <TextComponent $size={size} $fullWidth={fullWidth}>
        {children}
      </TextComponent>
      {showArrow && (
        <ArrowIcon
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.625 5V13.125C15.625 13.2908 15.5591 13.4497 15.4419 13.5669C15.3247 13.6842 15.1657 13.75 15 13.75C14.8342 13.75 14.6753 13.6842 14.558 13.5669C14.4408 13.4497 14.375 13.2908 14.375 13.125V6.50859L5.44217 15.4422C5.32489 15.5595 5.16583 15.6253 4.99998 15.6253C4.83413 15.6253 4.67507 15.5595 4.55779 15.4422C4.44052 15.3249 4.37463 15.1659 4.37463 15C4.37463 14.8341 4.44052 14.6751 4.55779 14.5578L13.4914 5.625H6.87498C6.70922 5.625 6.55025 5.55915 6.43304 5.44194C6.31583 5.32473 6.24998 5.16576 6.24998 5C6.24998 4.83424 6.31583 4.67527 6.43304 4.55806C6.55025 4.44085 6.70922 4.375 6.87498 4.375H15C15.1657 4.375 15.3247 4.44085 15.4419 4.55806C15.5591 4.67527 15.625 4.83424 15.625 5Z"
            fill="#FFFFFF"
          />
        </ArrowIcon>
      )}
    </StyledButton>
  );
};
