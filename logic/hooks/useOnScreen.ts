import { useEffect, useState, useRef } from 'react';

export default function useOnScreen(isInViewPort = false, options?: object) {
  const [isIntersecting, setIsIntersecting] = useState(isInViewPort);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isIntersecting, setIsIntersecting };
}
