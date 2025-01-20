'use client';

import { useState, useEffect } from 'react';
import TextBubble from '../components/TextBubble';

const Home: React.FC = () => {
  const conversation = [
    "Hi, I'm building my personal website!",
    "It's designed like a text conversation.",
    "How cool is that? 😊",
    "Want to learn more?",
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Track which bubble to display
  const [loading, setLoading] = useState(true); // Show loading for the first bubble
  const [exitingIndex, setExitingIndex] = useState<number | null>(null); // Track bubble flying off

  // Automatically stop loading for the first bubble after a delay
  useEffect(() => {
    if (currentIndex === 0 && loading) {
      setTimeout(() => setLoading(false), 1000); // Adjust delay as needed
    }
  }, [currentIndex, loading]);

  console.log(currentIndex)
  console.log(exitingIndex)

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;

      console.log(position)

      // Trigger the next bubble when scrolling past a threshold
      if (position > currentIndex * 200) { // Adjust scroll threshold as needed
        if (currentIndex < conversation.length - 1 && !loading) {
          setExitingIndex(currentIndex); // Mark the current bubble as exiting
          setTimeout(() => setCurrentIndex((prev) => prev + 1), 300); // Delay to sync with animation
          setLoading(true); // Reset loading for the next bubble
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex, loading, conversation.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md space-y-4 relative"
        style={{ minHeight: '200vh' }}
      >
        {conversation.slice(0, currentIndex + 1).map((text, index) => (
          <TextBubble
            key={index}
            text={text}
            isLoading={index === currentIndex && loading} // Show loading for the active bubble
            isExiting={index === exitingIndex} // Mark exiting bubble for animation
            bubbleType={index % 2 === 0 ? 'gray' : 'blue'}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;