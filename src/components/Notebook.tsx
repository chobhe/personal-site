'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import notebookCover from '@/assets/images/notebook-no-dividers.png';
import notebookInside from '@/assets/images/notebook-open.png';
import NotebookTabs, {tabs} from '@/components/Tabs';


// TODOs
// 1. pre click make sure the notebook opening is invisible -> DONE
// 1.5 make sure the notebook cover clickbox is smaller -> DONE
// 2  post click make the background still scrollable(DONE) and pre click while hovering over notebook -> DONE
// 3. make the notebook on click the tabs (Make the tabs their own component)
// 3.5 I feel like I essentially need to anchor the tabs from the cover to the inside then whichever one is clicked should rotate with the cover and anchor on the other side
// 4. design things on the tabs 
// 5. make the tabs visible when the notebook is open so the user can use them to navigate
// 5.5 when the tabs get clicked it should look like the page is flipping to the next page
// 6. Post click make the notebook closable by clicking on the background
// 7. pre click make the notebook draggable \
// 8. Pulse the tabs so it's obvious to click on them

export default function NotebookFlip({ title = 'charlie he' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('About Me');

    const [leftStartingIndex, setLeftStartingIndex] = useState(0);
    const [leftEndingIndex, setLeftEndingIndex] = useState(0);
    const [rightStartingIndex, setRightStartingIndex] = useState(tabs.length);
    const [rightEndingIndex, setRightEndingIndex] = useState(tabs.length);
    const [flippingStartinIndex, setFlippingStartingIndex] = useState(0);
    const [flippingEndingIndex, setFlippingEndingIndex] = useState(tabs.length);

    const [flipCount, setFlipCount] = useState(1);

    const handleTabClick = (tabName: string, flipDirection: string) => {
        if (flipDirection === 'left' && flipCount < 0) {
            setFlipCount(flipCount * -1 + 1);
        } else if (flipDirection === 'right' && flipCount > 0) {
            setFlipCount(flipCount * -1 - 1);
        } else if (flipDirection === 'left' && flipCount > 0) {
            setFlipCount(flipCount + 1);
        } else if (flipDirection === 'right' && flipCount < 0) {
            setFlipCount(flipCount - 1);
        } else {

        }
        setSelectedTab(tabName);

        console.log('Selected tab:', tabName);
        console.log('Flip count:', flipCount);
        console.log('Flip direction:', flipDirection);
        
        // Reset flip direction after the animation duration (700ms)
        // setTimeout(() => setFlipDirection(null), 700);
      };    

      // clearly see updated flipDirection here:
    useEffect(() => {
        var selectedIndex =0 
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].name === selectedTab) {
                selectedIndex = i;
                break;
            }
        }

        console.log('Flip direction UPDATED:', flipCount);
        if (flipCount > 0) {
            setFlippingStartingIndex(leftEndingIndex);
            setFlippingEndingIndex(selectedIndex);
            setLeftStartingIndex(0);
            // Don't set leftEndingIndex we keep it at what it was before
            setRightStartingIndex(selectedIndex);
            setRightEndingIndex(tabs.length);
        } else if (flipCount < 0) {
            setLeftStartingIndex(0);
            setLeftEndingIndex(selectedIndex);
            setFlippingStartingIndex(selectedIndex);
            setFlippingEndingIndex(rightStartingIndex);
            // Don't set rightStartingIndex we keep it at what it was before
            setRightEndingIndex(tabs.length);
        }
    }, [flipCount]);



    return (
      <div
        className="inline-block font-['Roboto'] relative"
        style={{ perspective: '1000px'}}
      >
        
        {/* Static Inside (background) */}
        <div className="relative flex items-center justify-center" style={{ width: '33vw', height: '50vh' }}>
            <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
                scale: isOpen ? 1.8 : 1,
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

            /**

            { /**
                <div
                className="absolute top-0 right-0"
                style={{
                    width: '50%',
                    height: '100%',
                }}
                >
                    {
                        tabs.map((tab) => {
                            <motion.div
                            className="absolute top-0 right-0"
                            initial={false}
                            animate={{
                                rotateY:
                                flipCount > 0 ? [0, 180] :
                                flipCount < 0 ? [180,0] :
                                0,
                                zIndex: flipCount != 0 ? 20 : 5,
                            }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            style={{
                                width: '50%',
                                height: '100%',
                                transformOrigin: 'left center',
                                transformStyle: 'preserve-3d',
                            }}
                            >
                                <motion.div
                                    className="absolute inset-y-0 right-1.5 flex flex-col items-end pointer-events-auto"
                                    initial={{ x: '2vw', opacity: 0 }}
                                    animate={{ x: isOpen ? '0vw' : '2vw', opacity: isOpen ? 1 : 0 }}
                                    style={{ width: '20%', zIndex: 10 }}
                                >
                                    <NotebookTabs selectedTab={selectedTab} setSelectedTab={(tab) => handleTabClick(tab, flipCount > 0 ? 'right' : 'left')}  startIndex={flippingStartinIndex} endIndex={flippingEndingIndex} left={false} cover={false}/>
                                </motion.div>
                            </motion.div>
                        })
                    }

                </div>
                 */
                }

                


                {/* Flipping right half */}
                <motion.div
                className="absolute top-0 right-0"
                initial={false}
                animate={{
                    rotateY:
                      flipCount > 0 ? [0, 180] :
                      flipCount < 0 ? [180,0] :
                      0,
                    zIndex: flipCount != 0 ? 20 : 5,
                  }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{
                    width: '50%',
                    height: '100%',
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                }}
                >
                    {/* Flipping Tabs */}
                    <motion.div
                        className="absolute inset-y-0 right-1.5 flex flex-col items-end pointer-events-auto"
                        initial={{ x: '2vw', opacity: 0 }}
                        animate={{ x: isOpen ? '0vw' : '2vw', opacity: isOpen ? 1 : 0 }}
                        style={{ width: '20%', zIndex: 10 }}
                    >
                        <NotebookTabs selectedTab={selectedTab} setSelectedTab={(tab) => handleTabClick(tab, flipCount > 0 ? 'right' : 'left')}  startIndex={flippingStartinIndex} endIndex={flippingEndingIndex} left={false} cover={false}/>
                    </motion.div>
                </motion.div>

                {/* Right-side Tabs */}
                <motion.div
                        className="absolute inset-y-0 right-1.5 flex flex-col items-end pointer-events-auto"
                        initial={{ x: '2vw', opacity: 0 }}
                        animate={{ x: isOpen ? '0vw' : '2vw', opacity: isOpen ? 1 : 0 }}
                        style={{ width: '10%', zIndex: 10 }}
                >
                    <NotebookTabs selectedTab={selectedTab} setSelectedTab={(tab) => handleTabClick(tab, 'left')}  startIndex={rightStartingIndex} endIndex={rightEndingIndex} left={false} cover={false}/>
                </motion.div>

                 {/* Left-side Tab */}
                 <motion.div
                    className="absolute inset-y-0 left-0 flex flex-col items-start pointer-events-auto"
                    initial={{ x: '-2vw', opacity: 0 }}
                    animate={{ x: isOpen ? '0vw' : '-2vw', opacity: isOpen ? 1 : 0 }}
                    style={{ width: '10%', zIndex: 10 }}
                >
                        <NotebookTabs selectedTab={selectedTab} setSelectedTab={(tab) => handleTabClick(tab, 'right')} startIndex={leftStartingIndex} endIndex={leftEndingIndex} left={true} cover={false}/>
                </motion.div>
        </motion.div>
            
        <div className="relative" style={{ width: '13vw', height: '40vh' }}>
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


                {/* Tabs on the cover */}
                <motion.div
                    className="absolute inset-y-0 flex flex-col items-end pointer-events-auto"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    style={{ width: '10%', right:"0%", zIndex: 30 }}
                >
                    <NotebookTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} startIndex={0} endIndex={tabs.length} stopPropagation={true} left={false} cover={true}/>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }