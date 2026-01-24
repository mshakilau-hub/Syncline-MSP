// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Forces scroll to top on every route change.
 * Place this inside <BrowserRouter> or in Layout.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately scroll to top when path changes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}