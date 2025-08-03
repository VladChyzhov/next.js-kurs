import React, { useState, useEffect } from 'react';

interface ShakeAnimationProps {
  children: React.ReactNode;
  shouldShake: boolean;
  className?: string;
}

export default function ShakeAnimation({ children, shouldShake, className = '' }: ShakeAnimationProps) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (shouldShake) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 500); // Длительность анимации

      return () => clearTimeout(timer);
    }
  }, [shouldShake]);

  return (
    <div 
      className={`
        ${className}
        ${isShaking ? 'animate-shake' : ''}
        transition-all duration-200
      `}
    >
      {children}
    </div>
  );
} 