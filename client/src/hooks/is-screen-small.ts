import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

const screenMediaQueries = {
  sm: `(max-width: 768px)`,
  md: `(min-width: 769px) and (max-width: 1024px)`,
  lg: `(min-width: 1025px)`,
} as Record<'sm' | 'md' | 'lg', string>;

/*
 * Custom hook to programmatically determine if the screen size is small.
 * @returns {boolean} - True if the screen size is small, false otherwise.
 */
const useIsScreenSmall = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = throttle(() => {
    setIsScreenSmall(window.matchMedia(screenMediaQueries.sm).matches);
  }, 250);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return isScreenSmall;
};

export { useIsScreenSmall };
