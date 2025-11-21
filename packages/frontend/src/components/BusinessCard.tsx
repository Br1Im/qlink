'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { useBusinessCards } from './BusinessCardsContext';

interface BusinessCardProps {
  children: ReactNode;
  delay?: number;
  index: number;
}

export default function BusinessCard({
  children,
  delay = 0,
  index,
}: BusinessCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { activeCardIndex, setActiveCardIndex } = useBusinessCards();

  const isActive = activeCardIndex === index;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate distance from card center to screen center
      const screenCenter = windowHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(screenCenter - cardCenter);
      
      // Only consider cards that are visible on screen
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Store distance for this card
        ref.current.setAttribute('data-distance', distanceFromCenter.toString());
        
        // Find the card closest to center
        const allCards = document.querySelectorAll('[data-distance]');
        let closestCard: Element | null = null;
        let minDistance = Infinity;
        
        allCards.forEach((card) => {
          const distance = parseFloat(card.getAttribute('data-distance') || 'Infinity');
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
          }
        });
        
        // Activate only if this card is the closest
        if (closestCard === ref.current) {
          setActiveCardIndex(index);
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [index, setActiveCardIndex]);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'animate-visible' : ''} ${
        isActive ? 'mobile-active' : ''
      }`}
    >
      {children}
    </div>
  );
}
