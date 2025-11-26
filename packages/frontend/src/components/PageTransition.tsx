'use client';

import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Компонент для плавного появления элементов списка
export function ListItemTransition({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}

// Компонент для модальных окон
export function ModalTransition({ children, isOpen }: { children: ReactNode; isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        style={{
          animation: 'scaleIn 0.2s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Компонент для карточек
export function CardTransition({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="card-hover"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}
