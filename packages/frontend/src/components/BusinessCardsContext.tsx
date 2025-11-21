'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BusinessCardsContextType {
  activeCardIndex: number | null;
  setActiveCardIndex: (index: number | null) => void;
}

const BusinessCardsContext = createContext<BusinessCardsContextType>({
  activeCardIndex: null,
  setActiveCardIndex: () => {},
});

export function BusinessCardsProvider({ children }: { children: ReactNode }) {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  return (
    <BusinessCardsContext.Provider
      value={{ activeCardIndex, setActiveCardIndex }}
    >
      {children}
    </BusinessCardsContext.Provider>
  );
}

export function useBusinessCards() {
  return useContext(BusinessCardsContext);
}
