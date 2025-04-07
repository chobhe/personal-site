'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import notebookCover from '@/assets/images/notebook-cover.png';
import notebookInside from '@/assets/images/notebook-open.png';

// TODOs
// 1. pre click make sure the notebook opening is invisible -> DONE
// 1.5 make sure the notebook cover clickbox is smaller -> DONE
// 2  post click make the background still scrollable 
// 3. make the notebook on click the tabs (Make the tabs their own component)
// 4. design things on the tabs 
// 5. make the tabs visible when the notebook is open so the user can use them to navigate
// 6. Post click make the notebook closable by clicking on the background
// 7. pre click make the notebook draggable 

export default function NotebookFlip({ title = 'charlie he' }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div
        className="inline-block font-['Roboto']"
        style={{ perspective: '1000px' }}
      >
        {/* Static Inside (background) */}
        <motion.div
          className="relative inline-block"
          initial={false}
          animate={{
            scale: isOpen ? 4 : 1,
            x: isOpen ? '0vw' : 0,
            y: isOpen ? '0vh' : 0,
            opacity: isOpen ? 1 : 0, // Only affects notebook inside

          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ width: '40vw', height: '40vh' }}
        >
            <Image
                src={notebookInside}
                alt="Notebook Inside"
                fill
                style={{ objectFit: 'contain', pointerEvents: 'none'}}
            />
        </motion.div>

    
        {/* Animated Cover (foreground) */}
        <motion.div
            className="absolute inset-0 origin-left cursor-pointer"
            initial={false}
            animate={{ rotateY: isOpen ? -160 : 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ 
                transformStyle: 'preserve-3d', 
                pointerEvents: 'auto',

            }}
        >
            <Image
                src={notebookCover}
                alt="Notebook Cover"
                fill
                style={{ objectFit: 'contain', backfaceVisibility: 'hidden' }}
            />

            {/* Small clickable area overlay (only handles clicks, no visual effect) */}
            <div
                className="absolute cursor-pointer"
                style={{
                width: '30%',   // <- clearly controls clickable region width ONLY
                height: '100%',  
                top: '20%',     
                left: '40%',    
                pointerEvents: 'auto', // explicitly captures click events
                }}
                onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
                }}
            />

            {/* Text fades out */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center text-black text-xl drop-shadow -translate-y-10 pointer-events-none"
                initial={false}
                animate={{ opacity: isOpen ? 0 : 1 }}
                style={{ pointerEvents: 'none' }} 
            >
            {title}
            </motion.div>
        </motion.div>
      </div>
    );
  }