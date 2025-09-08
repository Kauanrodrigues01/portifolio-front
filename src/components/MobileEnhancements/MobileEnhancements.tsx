import React, { useEffect, useState } from "react";
import { FiChevronUp, FiRefreshCw } from "react-icons/fi";
import styled from "styled-components";

// Mobile scroll indicator
const ScrollIndicator = styled.div<{ $progress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.mainBlue} 0%,
    ${({ theme }) => theme.colors.mainPurple} 50%,
    ${({ theme }) => theme.colors.mainRed} 100%
  );
  width: ${({ $progress }) => $progress}%;
  z-index: 999;
  transition: width 0.1s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Back to top button for mobile
const BackToTopButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mainBlue};
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(100px)"};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:active {
    transform: ${({ $visible }) =>
      $visible ? "scale(0.9) translateY(0)" : "translateY(100px)"};
  }

  @media (min-width: 769px) {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

// Touch-optimized loading spinner
const LoadingSpinner = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.surface};
  border-top: 3px solid ${({ theme }) => theme.colors.mainBlue};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 1001;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

// Pull-to-refresh indicator (visual feedback)
const PullToRefreshIndicator = styled.div<{
  $pulling: boolean;
  $distance: number;
}>`
  position: fixed;
  top: ${({ $distance }) => Math.min($distance - 60, 40)}px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.mainBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${({ $pulling, $distance }) => ($pulling && $distance > 60 ? 1 : 0)};
  transform: translateX(-50%)
    scale(${({ $distance }) => Math.min($distance / 100, 1)});
  transition: opacity ${({ theme }) => theme.transitions.fast};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.mainBlue};
    transform: rotate(${({ $distance }) => ($distance / 100) * 180}deg);
    transition: transform 0.1s ease;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

// Mobile navigation dots for sections - REMOVED for cleaner interface
// const MobileNavDots = styled.div`
//   position: fixed;
//   right: 16px;
//   top: 50%;
//   transform: translateY(-50%);
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   z-index: 997;

//   @media (min-width: 769px) {
//     display: none;
//   }
// `;

// const NavDot = styled.button<{ $active: boolean }>`
//   width: 12px;
//   height: 12px;
//   border-radius: 50%;
//   border: 2px solid ${({ theme }) => theme.colors.mainBlue};
//   background: ${({ $active, theme }) =>
//     $active ? theme.colors.mainBlue : 'transparent'};
//   cursor: pointer;
//   transition: all ${({ theme }) => theme.transitions.fast};
//   opacity: 0.7;

//   &:active {
//     transform: scale(1.2);
//   }
// `;

interface MobileEnhancementsProps {
  children: React.ReactNode;
}

export const MobileEnhancements: React.FC<MobileEnhancementsProps> = ({
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(currentProgress, 100));
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pull to refresh functionality
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let isPulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;

      currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      if (distance > 0 && window.scrollY === 0) {
        setPulling(true);
        setPullDistance(distance);

        if (distance > 100) {
          e.preventDefault(); // Prevent default pull-to-refresh
        }
      }
    };

    const handleTouchEnd = () => {
      if (pulling && pullDistance > 100) {
        setLoading(true);
        // Simulate refresh
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 1500);
      }

      setPulling(false);
      setPullDistance(0);
      isPulling = false;
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pulling, pullDistance]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ScrollIndicator $progress={scrollProgress} />

      <PullToRefreshIndicator $pulling={pulling} $distance={pullDistance}>
        <FiRefreshCw />
      </PullToRefreshIndicator>

      <LoadingSpinner $visible={loading} />

      <BackToTopButton $visible={showBackToTop} onClick={scrollToTop}>
        <FiChevronUp />
      </BackToTopButton>

      <div id="hero">{children}</div>
    </>
  );
};

// Section wrapper component for better mobile navigation
export const MobileSection = styled.section<{ id: string }>`
  position: relative;

  &:not(:last-child)::after {
    content: "";
    display: block;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.border} 20%,
      ${({ theme }) => theme.colors.border} 80%,
      transparent 100%
    );
    margin: 60px auto 40px;
    max-width: 200px;

    @media (min-width: 769px) {
      display: none;
    }
  }
`;
