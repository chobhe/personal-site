'use client';

import { useEffect, useState } from 'react';
import TextBubble from '../components/TextBubble';
import dynamic from 'next/dynamic';

const Home: React.FC = () => {
  const conversation = [
    "Hi, I'm building my personal website!",
    "It's designed like a text conversation.",
    "How cool is that? 😊",
    "Want to learn more?",
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [smoothScrollPosition, setSmoothScrollPosition] = useState(0); // For interpolated scroll position


  // Smooth scroll interpolation
  useEffect(() => {
    let animationFrame: number;

    const smoothScroll = () => {
      setSmoothScrollPosition((prev) =>
        prev + (scrollPosition - prev) * 0.1 // Ease towards the target scrollPosition
      );
      animationFrame = requestAnimationFrame(smoothScroll);
    };

    animationFrame = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrame); // Clean up on unmount
  }, [scrollPosition]);

  useEffect(() => {

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className="min-h-[400vh] bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md space-y-4 relative">
        {conversation.map((text, index) => {
          // Calculate bubble offset
          const bubbleAnchor = index * viewportHeight;
          const offset = smoothScrollPosition - bubbleAnchor;

          console.log(` bubble ${index} offset: ${offset} bubbleAnchor: ${bubbleAnchor} scrollPosition: ${scrollPosition} viewportWidth: ${viewportWidth} viewportHeight: ${viewportHeight}`);

          // Smooth transitions based on scroll
          const translateY = viewportHeight - offset; // Directly tie Y position to the offset
          // const translateX = Math.min(-viewportWidth/2 + offset,0) + Math.min(0, viewportWidth/2 - offset)
          const translateX =
          translateY >= viewportHeight / 2
            ? -((viewportWidth / 2) * (translateY - viewportHeight/2)) / (viewportHeight / 2)
            : ((viewportWidth / 2) * (translateY - viewportHeight/2)) / (viewportHeight / 2);
          // TODO: Make a x = y^2 curve with a max of viewportWidth/2





           // Scale the bubble (min 0.5, max 1.5 at center)
          //  const scale = Math.max(0.5, Math.min(1.5, 1 + (1 - Math.abs(offset - viewportHeight / 2) / (viewportHeight / 2))));
          const scale = 1

           // Opacity: Fully visible at center, fades out at edges
           const opacity = 1

          return (
            <TextBubble
              key={index}
              text={text}
              style={{
                opacity,
                transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Disable SSR for the Home component
export default dynamic(() => Promise.resolve(Home), { ssr: false });
