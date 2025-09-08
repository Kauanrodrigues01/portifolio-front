import { useEffect, useRef, useState } from 'react';

interface TouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onPinch?: (scale: number) => void;
  threshold?: number;
  longPressDelay?: number;
}

interface TouchData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startTime: number;
  endTime: number;
  distance: number;
  direction: string;
}

export const useTouchGestures = (options: TouchGestureOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onDoubleTap,
    onLongPress,
    onPinch,
    threshold = 50,
    longPressDelay = 500
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [touchData, setTouchData] = useState<TouchData | null>(null);
  const [lastTapTime, setLastTapTime] = useState(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const initialDistance = useRef<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const now = Date.now();
      
      // Handle multi-touch for pinch
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance.current = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        return;
      }

      const newTouchData: TouchData = {
        startX: touch.clientX,
        startY: touch.clientY,
        endX: touch.clientX,
        endY: touch.clientY,
        startTime: now,
        endTime: now,
        distance: 0,
        direction: ''
      };

      setTouchData(newTouchData);

      // Start long press timer
      if (onLongPress) {
        longPressTimer.current = setTimeout(() => {
          onLongPress();
        }, longPressDelay);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchData) return;

      // Clear long press timer on move
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      // Handle pinch gesture
      if (e.touches.length === 2 && onPinch) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        if (initialDistance.current > 0) {
          const scale = currentDistance / initialDistance.current;
          onPinch(scale);
        }
        return;
      }

      const touch = e.touches[0];
      setTouchData(prev => prev ? {
        ...prev,
        endX: touch.clientX,
        endY: touch.clientY,
        endTime: Date.now()
      } : null);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Clear long press timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      if (!touchData) return;

      const deltaX = touchData.endX - touchData.startX;
      const deltaY = touchData.endY - touchData.startY;
      const distance = Math.hypot(deltaX, deltaY);
      const duration = touchData.endTime - touchData.startTime;

      // Determine if it's a tap or swipe
      if (distance < 10 && duration < 300) {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapTime;

        if (timeSinceLastTap < 300 && onDoubleTap) {
          // Double tap
          onDoubleTap();
          setLastTapTime(0); // Reset to prevent triple tap
        } else if (onTap) {
          // Single tap
          onTap();
          setLastTapTime(now);
        }
      } else if (distance > threshold) {
        // Swipe gesture
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > absDeltaY) {
          // Horizontal swipe
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }

      setTouchData(null);
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [touchData, lastTapTime, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onDoubleTap, onLongPress, onPinch, threshold, longPressDelay]);

  return ref;
};

// Hook for smooth mobile scrolling with momentum
export const useMobileScroll = () => {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Enable smooth scrolling with momentum on iOS
      document.body.style.webkitOverflowScrolling = 'touch';
      
      // Prevent overscroll bounce on the entire page
      document.body.style.overscrollBehavior = 'none';
      
      // Optimize touch events
      const preventDefaultTouchMove = (e: TouchEvent) => {
        // Allow scrolling but prevent other default behaviors
        if (e.touches.length > 1) {
          e.preventDefault(); // Prevent pinch zoom on page
        }
      };

      document.addEventListener('touchmove', preventDefaultTouchMove, { passive: false });

      return () => {
        document.removeEventListener('touchmove', preventDefaultTouchMove);
        document.body.style.webkitOverflowScrolling = '';
        document.body.style.overscrollBehavior = '';
      };
    }
  }, []);
};

// Hook for mobile viewport management
export const useMobileViewport = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      // Set CSS custom property for mobile viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);
};
