'use client';

// import { useEffect, useState } from 'react';
import TextBubble from '../components/TextBubble';
import dynamic from 'next/dynamic';


// const Home: React.FC = () => {
//   const conversation = [
//     "Hi, I'm building my personal website!",
//     "It's designed like a text conversation.",
//     "How cool is that? 😊",
//     "Want to learn more?",
//   ];

//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [viewportHeight, setViewportHeight] = useState(0);
//   const [viewportWidth, setViewportWidth] = useState(0);
//   // const [smoothScrollPosition, setSmoothScrollPosition] = useState(0); // For interpolated scroll position


//   // // Smooth scroll interpolation
//   // useEffect(() => {
//   //   let animationFrame: number;

//   //   const smoothScroll = () => {
//   //     setSmoothScrollPosition((prev) =>
//   //       prev + (scrollPosition - prev) * 0.9 // Ease towards the target scrollPosition
//   //     );
//   //     animationFrame = requestAnimationFrame(smoothScroll);
//   //   };

//   //   animationFrame = requestAnimationFrame(smoothScroll);

//   //   return () => cancelAnimationFrame(animationFrame); // Clean up on unmount
//   // }, [scrollPosition]);

//   useEffect(() => {

//     const handleResize = () => {
//       setViewportHeight(window.innerHeight);
//       setViewportWidth(window.innerWidth);
//     };

//     const handleScroll = () => {
//       setScrollPosition(window.scrollY);
//     };

//     handleResize();
//     handleScroll();

//     window.addEventListener('resize', handleResize);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);



//   return (
//     <div className="min-h-[400vh] bg-gray-50 flex flex-col items-center">
//       <div className="w-full max-w-md space-y-4 relative">
//         {conversation.map((text, index) => {

//           // Calculate bubble offset
//           const bubbleAnchor = (index + 1) * viewportHeight; // Y coordinate of the bubble
//           // const offset = smoothScrollPosition - bubbleAnchor;

          
//           // X coordinate of the bubble
//           const relWidth = ((scrollPosition % viewportHeight)/viewportHeight) * viewportWidth
//           const translateX =  
//           relWidth < viewportWidth/2
//           ? relWidth - viewportWidth/2
//           : viewportWidth/2 - relWidth

//           console.log(` bubble ${index} bubbleX: ${translateX} bubbleAnchor: ${bubbleAnchor} scrollPosition: ${scrollPosition} viewportWidth: ${viewportWidth} viewportHeight: ${viewportHeight}`);



//            // Scale the bubble (min 0.5, max 1.5 at center)
//           //  const scale = Math.max(0.5, Math.min(1.5, 1 + (1 - Math.abs(offset - viewportHeight / 2) / (viewportHeight / 2))));
//           const scale = 1

//            // Opacity: Fully visible at center, fades out at edges
//            const opacity = 1

//           return (
//             <TextBubble
//               key={index}
//               text={text}
//               heightRatio={.1}
//               widthRatio={.25}
//               style={{
//                 opacity,
//                 transform: `translate(${translateX}px, ${bubbleAnchor}px) scale(${scale})`,
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };



import { motion, useScroll, useTransform } from "framer-motion";

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

  return (
    <div className="min-h-[400vh] bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md space-y-4 relative">
        {conversation.map((text, index) => {
          const bubbleAnchor = (index + 1) * viewportHeight;

          // translateX is the scaled function of the scroll postition
          const translateX = useTransform(scrollY, [0, viewportHeight], [0, viewportWidth])

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
