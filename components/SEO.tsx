
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | CalcMaster`;

    // Helper to update meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
  }, [title, description, keywords]);

  return null;
};