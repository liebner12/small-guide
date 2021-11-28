import { useState, useEffect, useRef } from 'react';

export default function useComponenFocus(initialIsVisible: Boolean) {
  const [isComponentFocused, setIsComponentFocused] =
    useState(initialIsVisible);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentFocused(false);
      ref.current.blur();
    }
  };

  useEffect(() => {
    if (initialIsVisible) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentFocused, setIsComponentFocused };
}
