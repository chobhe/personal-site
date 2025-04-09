'use client';

import { useEffect, useRef, useState } from 'react';
import VideoCollage from '@/components/VideoCollage';
import Notebook from '@/components/Notebook';



export default function Page() {
  // Video collage states
  const containerRef = useRef<HTMLDivElement>(null);
  const [collageHeight, setCollageHeight] = useState(0); // Default initial height
  const [collages, setCollages] = useState([-1, 0, 1]); // Indexes for rendered collages

  useEffect(() => {
    setCollageHeight(window.innerHeight); // Runs only on client-side after component mounts

    // Optional: Update on window resize
    const handleResize = () => setCollageHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Infinite Scroll Logic (Add collages dynamically)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const scrollBottom = scrollTop + containerRef.current.clientHeight;

      // Add new collage at the bottom when reaching 90% of the current stack
      if (scrollBottom >= collages.length * collageHeight - collageHeight * 0.5) {
        setCollages((prev) => [...prev, prev[prev.length - 1] + 1]); // Add a new one below
      }


      // Optional: Remove old collages to optimize performance
      if (collages.length > 10) {
        setCollages((prev) => prev.slice(1)); // Keep a rolling window of 10 collages
      }
    };

    const ref = containerRef.current;
    ref?.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, [collages, collageHeight]);




  return (
   <div className="w-screen h-screen flex items-center justify-center relative">
      {/* Video Collage Container (Scrollable) */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-scroll"
        style={{ height: "100vh", scrollBehavior: "smooth" }}
      >
        {/* Dynamically render stacked VideoCollages */}
        {collages.map((index) => (
          <div key={index} className="relative w-full" style={{ height: collageHeight }}>
            <VideoCollage />
          </div>
        ))}
      </div>

      {/* Notebook Overlay */}
      <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <Notebook title="charlie he" />
      </div>
    </div>
  );
}