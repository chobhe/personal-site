'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import notebookCover from '@/assets/images/notebook-cover.png';


export default function Page() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

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
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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