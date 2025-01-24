'use client';

import { useEffect, useState } from 'react';
import TextBubble from '../components/TextBubble';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, motionValue} from "framer-motion";

const Home: React.FC = () => {
  const conversation = [
    "Hi, I'm building my personal website!",
    "It's designed like a text conversation.",
    "How cool is that? 😊",
    "Want to learn more?",
  ];

  const { scrollY } = useScroll();
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;


  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      console.log(`scrollY changed: ${latest}`);
    });
    
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="min-h-[400vh] bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md space-y-4 relative">
        {conversation.map((text, index) => {
          const bubbleAnchor = (index + 1) * viewportHeight;

          // translateX is the scaled function of the scroll postition
          const translateX = useTransform(
            scrollY,
            [bubbleAnchor - viewportHeight, bubbleAnchor -viewportHeight/2, bubbleAnchor],
            [
              -viewportWidth/2, // Start buttom left
              0, // Center
              -viewportWidth/2, // end top left
            ]
          );
          console.log(`translateX ${translateX.get} bubbleAnchor ${bubbleAnchor} scrollY ${scrollY.get()}`)

          return (
            <motion.div
              key={index}
              style={{
                x: translateX,
                y: bubbleAnchor,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <TextBubble text={text} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Disable SSR for the Home component
export default dynamic(() => Promise.resolve(Home), { ssr: false });
