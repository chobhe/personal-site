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
          const bubbleAnchor = index * 400; // Space bubbles every 400px
          const offset = smoothScrollPosition - bubbleAnchor;

          console.log(`offset: ${offset} bubbleAnchor: ${bubbleAnchor} scrollPosition: ${scrollPosition}`);

          // Smooth transitions based on scroll
          const opacity = Math.max(0, 1 - Math.abs(offset) / 400); // Fully visible near its anchor
          const translateY = viewportHeight - offset; // Directly tie Y position to the offset

          return (
            <TextBubble
              key={index}
              text={text}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`, // Smooth vertical movement
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
