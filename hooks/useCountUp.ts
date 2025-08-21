import { useState, useEffect, useRef } from 'react';

// Easing function for a smoother animation
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(target: number, duration: number = 500): number {
  const [count, setCount] = useState<number>(0);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const startValueRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    startTimeRef.current = performance.now();
    startValueRef.current = count;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === undefined || startValueRef.current === undefined) {
        return;
      }
      
      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentVal = startValueRef.current + (target - startValueRef.current) * easedProgress;

      setCount(currentVal);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure it ends on the exact target
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target, duration]);

  return count;
}
