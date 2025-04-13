import { RefObject, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(refs)
        ? refs
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && r.current.contains(target))
        : refs.current && !refs.current.contains(target);

      if (isOutside) {
        handler(event);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [refs, handler]);
};

export { useOutsideClick };
