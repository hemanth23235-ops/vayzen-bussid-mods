'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-dark-900/90 hover:bg-brand-orange text-brand-orange hover:text-white border border-dark-700 hover:border-brand-orange shadow-lg shadow-black/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md group"
    >
      <ChevronUp className="w-5 h-5 group-hover:animate-bounce" />
    </button>
  );
}
