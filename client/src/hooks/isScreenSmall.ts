import { useEffect, useState } from 'react';

const MIN_WIDTH = 580;
const MIN_HEIGHT = 350;

const useIsScreenSmall = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  const checkScreenSize = () => {
    setIsScreenSmall(
      window.innerWidth <= MIN_WIDTH || window.innerHeight <= MIN_HEIGHT,
    );
  };

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
