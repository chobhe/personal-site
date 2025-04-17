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
    const [isAnimating, setIsAnimating] = useState<Record<string, boolean>>({
        'About Me': false,
        'Work History': false,
        'Lists': false,
      });


    // All the tabs start on the right side
    const [tabPositions, setTabPositions] = useState<Record<string, boolean>>({
        'About Me': false,
        'Work History': false,
        'Lists': false,
      });
   

    // TODO: Loop through all the tabs and depending on the flipDirection and the selected tab, flip all the other tabs
    const handleTabClick = (tabName: string, flipDirection: string) => {
        setSelectedTab(tabName);

        // Loop through all the tabs and depending on the flipDirection and the selected tab, flip all the other tabs
        var tabIndex = tabs.findIndex((tab) => tab.name === tabName);
        if (flipDirection === 'left') {
            // when flipping a tab left we need to flip all tabs above it too because the tabs are currently on the right side
            for (let i = 0; i < tabIndex; i++) {
                setTabPositions((prev) => {
                    // Create a shallow copy of the previous state
                    const updatedPositions = { ...prev };
                  
                    // Set the specific tab's position to true(which sets it to be on the left side)
                    updatedPositions[tabs[i].name] = true;
                  
                    // Return the updated object
                    return updatedPositions;
                  }
                );
            }
        } else if (flipDirection === 'right') {
            // when flipping a tab right we need to flip all tabs below it too because the tabs are currently on the left side
            for (let i = tabIndex; i < tabs.length; i++) {
                setTabPositions((prev) => {
                    // Create a shallow copy of the previous state
                    const updatedPositions = { ...prev };
                  
                    // Set the specific tab's position to false (which sets it to be on the right side)
                    updatedPositions[tabs[i].name] = false;
                  
                    // Return the updated object
                    return updatedPositions;
                  });
            }
        }

      };    

    var selectedIndex = 0 
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].name === selectedTab) {
            selectedIndex = i;
            break;
        }
    }





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

                {
                    tabs.map((tab) => (
                        <motion.div
                        key={tab.name}
                        className="absolute top-0 right-0"
                        initial={false}
                        animate={{
                            rotateY: tabPositions[tab.name] ? [0, 180] : [180, 0],
                            zIndex: 0, // clearly use state here
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
                                style={{ width: '20%', zIndex:20 }}
                            >
                                <NotebookTabs selectedTabName={selectedTab} setSelectedTabName={(tabName) => handleTabClick(tabName, tabPositions[tabName] ? 'right' : 'left')}  currentTabName={tab.name} currentTabLeft={tabPositions[tab.name]} stopPropagation={false} cover={false}/>
                            </motion.div>
                            <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
                                <Image
                                    src={notebookInside}
                                    alt="Notebook Inside Right Half"
                                    fill
                                    style={{
                                    objectFit: 'cover',        
                                    objectPosition: 'right',
                                    zIndex: 10
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))
                }
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
                    {
                    tabs.map((tab) => (
                        <div key={tab.name}>
                            <NotebookTabs selectedTabName={selectedTab} setSelectedTabName={(tabName) => handleTabClick(tabName, tabPositions[tabName] ? 'right' : 'left')}  currentTabName={tab.name} currentTabLeft={tabPositions[tab.name]} stopPropagation={true} cover={true}/>
                        </div>
                    ))
                }
                </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }