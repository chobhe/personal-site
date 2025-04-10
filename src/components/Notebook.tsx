'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import notebookCover from '@/assets/images/notebook-no-dividers.png';
import notebookInside from '@/assets/images/notebook-open.png';
import Tabs from '@/components/Tabs';


// TODOs
// 1. pre click make sure the notebook opening is invisible -> DONE
// 1.5 make sure the notebook cover clickbox is smaller -> DONE
// 2  post click make the background still scrollable(DONE) and pre click while hovering over notebook -> DONE
// 3. make the notebook on click the tabs (Make the tabs their own component)
// 4. design things on the tabs 
// 5. make the tabs visible when the notebook is open so the user can use them to navigate
// 5.5 when the tabs get clicked it should look like the page is flipping to the next page
// 6. Post click make the notebook closable by clicking on the background
// 7. pre click make the notebook draggable 

export default function NotebookFlip({ title = 'charlie he' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('About Me');


    return (
      <div
        className="inline-block font-['Roboto'] relative"
        style={{ perspective: '1000px'}}
      >
        <div className="relative" style={{ width: '19vw', height: '40vh' }}>
        {/* Static Inside (background) */}
            <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
                scale: isOpen ? 4 : 1,
                x: isOpen ? '0vw' : 0,
                y: isOpen ? '0vh' : 0,
                opacity: isOpen ? 1 : 0, // Only affects notebook inside

            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ pointerEvents: 'none' }}
            >
                <Image
                    src={notebookInside}
                    alt="Notebook Inside"
                    fill
                    style={{ objectFit: 'contain'}}
                />
            </motion.div>

            {/* Animated Cover (foreground) */}
            <motion.div
                className="absolute inset-0 origin-left"
                initial={false}
                animate={{ rotateY: isOpen ? -160 : 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                style={{ 
                    transformStyle: 'preserve-3d', 
                }}
            >
                <Image
                    src={notebookCover}
                    alt="Notebook Cover"
                    fill
                    style={{ 
                        objectFit: 'contain', 
                        backfaceVisibility: 'hidden',
                    }}
                />

                {/* Small clickable area overlay (only handles clicks, no visual effect) */}
                <button
                    className="absolute cursor-pointer"
                    style={{
                        width: '90%',   // <- clearly controls clickable region width ONLY
                        height: '90%',  
                        top: '5%',     
                        left: '5%',
                        background: 'transparent', // invisible clickable area
                        border: 'none', 
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
                >
                {title}
                </motion.div>

                <div className="absolute inset-y-0 pointer-events-auto" style={{ right: '0%', width: '10%', zIndex: 10 }}>
                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                </div>
            </motion.div>
        </div>
      </div>
    );
  }