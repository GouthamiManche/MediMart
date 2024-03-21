import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CircleMouseFollower = () => {
  const circleRef = useRef(null);
  const xScaleRef = useRef(1);
  const yScaleRef = useRef(1);
  const xPrevRef = useRef(0);
  const yPrevRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      clearTimeout(timeoutRef.current);

      const clampedXScale = gsap.utils.clamp(0.8, 1.2, event.pageX - xPrevRef.current);
      const clampedYScale = gsap.utils.clamp(0.8, 1.2, event.pageY - yPrevRef.current);

      xScaleRef.current = clampedXScale;
      yScaleRef.current = clampedYScale;
      xPrevRef.current = event.pageX;
      yPrevRef.current = event.pageY;

      circleRef.current.style.transform = `translate(${event.pageX}px, ${event.pageY}px) scale(${clampedXScale}, ${clampedYScale})`;

      timeoutRef.current = setTimeout(() => {
        circleRef.current.style.transform = `translate(${event.pageX}px, ${event.pageY}px) scale(1, 1)`;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      className="absolute z-50 w-2.5 h-2.5 rounded-full bg-black transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
    />
  );
};

export default CircleMouseFollower;