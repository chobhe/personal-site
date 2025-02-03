'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import notebookCover from '@/assets/images/notebook-cover.png';
import VideoCollage from '@/components/VideoCollage';



export default function Page() {
  // Draggable image states
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  // Video collage states
  const containerRef = useRef<HTMLDivElement>(null);
  const [collageHeight, setCollageHeight] = useState(() => window.innerHeight); // Set initial height
  const [collages, setCollages] = useState([-1, 0, 1]); // Indexes for rendered collages


  // Update collage height when window resizes
  useEffect(() => {
    const updateCollageHeight = () => setCollageHeight(window.innerHeight);
    window.addEventListener("resize", updateCollageHeight);
    return () => window.removeEventListener("resize", updateCollageHeight);
  }, []);

  // Ensure the user starts at the middle collage (ID 0)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = collageHeight; // Start at the second item (collage 0)
    }
  }, [collageHeight]);

  // Infinite Scroll Logic (Add collages dynamically)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const scrollBottom = scrollTop + containerRef.current.clientHeight;

      // Add new collage at the bottom when reaching 90% of the current stack
      if (scrollBottom >= collages.length * collageHeight - collageHeight * 0.1) {
        setCollages((prev) => [...prev, prev.length]); // Add a new one below
      }

      // Add a new collage at the top when reaching the first 10% of the scroll
      if (scrollTop <= collageHeight * 0.1 ) {
        setCollages((prev) => [prev[0] - 1, ...prev]); // Add a new one above

        // Prevent visual jump by keeping user at the same visible scroll position
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop += collageHeight;
          }
        }, 0);
      }

      // Optional: Remove old collages to optimize performance
      if (collages.length > 10) {
        setCollages((prev) => prev.slice(1, -1)); // Keep a rolling window of 10 collages
      }
    };

    const ref = containerRef.current;
    ref?.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, [collages, collageHeight]);


  // Function to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent browser drag behavior
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Function to update position on mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  // Function to stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Attach global mousemove and mouseup listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

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

      {/* Draggable Image */}
      <div
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          willChange: 'transform', // Optimizes performance
        }}
        onMouseDown={handleMouseDown}
      >
        <Image src={notebookCover} alt="Draggable Image" width={200} height={200} />
      </div>
    </div>
  );
}