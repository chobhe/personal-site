'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import notebookCover from '@/assets/images/notebook-no-dividers.png';
import notebookInside from '@/assets/images/notebook-open.png';
import notebookInsideRight from '@/assets/images/notebook-open-right.png';
import NotebookTabs, { tabs } from '@/components/Tabs';
import { NotebookPage } from './NotebookPage';
import ReactMarkdown from 'react-markdown';
import { Kalam } from 'next/font/google';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';




const tabContent = {
  'About Me': { front: '', back: '' },
  'Work History': { front: '', back: '' },
  'Lists': { front: '', back: '' },
};

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['400'], // normal writing weight
  });

interface NotebookProps {
  title: string;
  notebookOpen: boolean;
  setNotebookOpen: (open: boolean) => void;
}


// TODOs
// 6. Post click make the notebook closable by clicking on the background -> Partially done 
// EC: Make the page flipping perfect
// Put content on the pages 
// Animate the content like it's being handwritten in real time
// Add github, linkedin, email icons at the bottom of the about me page 
/* 
[Email](mailto:he.Charlie@yahoo.com)
[Github](https://github.com/chobhe)
[Linkedin](https://www.linkedin.com/in/charliehe1/)
*/



export default function NotebookFlip({ title = 'charlie he', notebookOpen, setNotebookOpen }: NotebookProps) {
    const [selectedTab, setSelectedTab] = useState('About Me');
    const [frontTab, setFrontTab] = useState(selectedTab);
    const [markdownContent, setMarkdownContent] = useState(tabContent);

    // Fetch markdown content when component mounts
    useEffect(() => {
      const fetchMarkdown = async () => {
        try {
          const aboutMeResponse = await fetch('/page-md-content/about-me.md');
          const workHistoryResponse = await fetch('/page-md-content/work-history.md');
          const listsResponse = await fetch('/page-md-content/lists.md');
          
          const aboutMeText = await aboutMeResponse.text();
          const workHistoryText = await workHistoryResponse.text();
          const listsText = await listsResponse.text();
          
          setMarkdownContent({
            'About Me': { front: aboutMeText, back: '' },
            'Work History': { front: workHistoryText, back: '' },
            'Lists': { front: listsText, back: '' },
          });
        } catch (error) {
          console.error('Error loading markdown files:', error);
        }
      };
      
      fetchMarkdown();
    }, []);

    // All the tabs start on the right side
    const [tabPositions, setTabPositions] = useState<Record<string, boolean>>({
        'About Me': false,
        'Work History': false,
        'Lists': false,
      });
   

    // Loop through all the tabs and depending on the flipDirection and the selected tab, flip all the other tabs
    const handleTabClick = (tabName: string, flipDirection: string) => {
        // Explicitly prevent clicks if animation is already happening        
        setSelectedTab(tabName);

        // Loop through all the tabs and depending on the flipDirection and the selected tab, flip all the other tabs
        var tabIndex = tabs.findIndex((tab) => tab.name === tabName);
        setTabPositions((prev) => {
            const updatedPositions = { ...prev };
            if (flipDirection === 'left') {
                for (let i = 0; i < tabIndex; i++) {
                    updatedPositions[tabs[i].name] = true;
                }
            } else if (flipDirection === 'right') {
                for (let i = tabIndex; i < tabs.length; i++) {
                    updatedPositions[tabs[i].name] = false;
                }
            }

            return updatedPositions;
        });
      };    

    var selectedIndex = 0 
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].name === selectedTab) {
            selectedIndex = i;
            break;
        }
    }



return (
    <>
    {/* Notebook content, stops propagation so clicks inside don't close */}
    <div
        className="inline-block font-['Roboto'] relative z-20"
        style={{ perspective: '1000px' }}
        onClick={e => e.stopPropagation()}
    >
          
        {/* Static Inside (background) */}
        <div className="relative flex items-center justify-center" 
            style={{ width: '33vw', height: '50vh' }}
        >
            <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
                scale: notebookOpen ? 1.8 : 1,
                opacity: notebookOpen ? 1 : 0, // Only affects notebook inside

            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            // style={{ pointerEvents: 'none' }}
            >
                <Image
                    src={notebookInside}
                    alt="Notebook Inside"
                    fill
                    style={{ objectFit: 'contain', pointerEvents: 'none'}}
                />
                  
                 

                    {
                      tabs.map((currentTab) => {
                          var tabIndex = tabs.findIndex((tab) => tab.name === currentTab.name);
                          var frontTabIndex = tabs.findIndex((tab) => tab.name === frontTab);
                          var zIndex = frontTab === currentTab.name ? 30 : 5;
                          // If that tab is on the right side and the tab is above the selected tab, set a high zIndex for flipping.
                          // Post flipping we want the tab closest to the selected tab to have the highest zIndex
                          if (!tabPositions[currentTab.name])  { // on the right side
                              if (tabIndex >= frontTabIndex) { // the tab and below the selected tab
                                  zIndex = 10 * (tabs.length - tabIndex);
                              } 
                          } else if (tabPositions[currentTab.name]) { // on the left side
                              if (tabIndex < frontTabIndex) { // the tab and above the selected tab
                                  zIndex = 10 * (tabIndex);
                              }
                          }



                        return (
                        <motion.div
                            key={currentTab.name}
                            className="absolute top-0 right-0"
                            initial={false}
                            animate={{
                                rotateY: tabPositions[currentTab.name] ? 180 : 0,
                                zIndex: zIndex,
                            }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            style={{
                                width: '50%',
                                height: '100%',
                                transformOrigin: 'left center', 
                                transformStyle: 'preserve-3d',
                                zIndex: tabPositions[currentTab.name] ? zIndex - 1 : zIndex, // Lower z-index when flipped
                            }}
                            onAnimationComplete={() => {
                                setFrontTab(selectedTab);
                            }}
                        >
                            <motion.div
                                className="absolute inset-y-0 right-1.5 flex flex-col items-end pointer-events-auto"
                                initial={{ x: '2vw', opacity: 0 }}
                                animate={{ x: notebookOpen ? '0vw' : '2vw', opacity: notebookOpen ? 1 : 0 }}
                                style={{ width: '20%', zIndex: 20 }}
                            >
                                <NotebookTabs selectedTabName={selectedTab} setSelectedTabName={(tabName) => handleTabClick(tabName, tabPositions[tabName] ? 'right' : 'left')}  currentTabName={currentTab.name} currentTabLeft={tabPositions[currentTab.name]} stopPropagation={false} cover={false}/>
                            </motion.div>
                                <div
                                className="absolute"
                                style={{
                                    width: '100%',            
                                    height: '100%',
                                    overflow: 'hidden',       
                                    right: 0,
                                    top: 0,
                                    zIndex: 5,
                                    transformStyle: 'preserve-3d',
                                    backfaceVisibility: 'hidden',
                                }}
                                >   
                                <Image
                                    src={notebookInsideRight}
                                    alt="Notebook Inside Right Half"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        objectPosition: 'center',
                                        backfaceVisibility: 'hidden',
                                        pointerEvents: 'none'
                                    }}
                                />
                                {/* Add markdown content overlay */}
                                <div className={`${kalam.className} absolute inset-0 p-8 overflow-y-auto`} style={{
                                width: '90%',
                                height: '90%',
                                margin: '5% auto',
                                backgroundColor: 'transparent',
                                left: '-5%',
                                }}>
                                <div className="flex justify-end mb-4">
                                    <div className="text-right text-[10px] tracking-wide text-black">
                                    <div>{new Date(new Date().setDate(new Date().getDate() + tabIndex)).toLocaleDateString()}</div>
                                    <div><strong>Entry #{tabIndex + 1}</strong></div>
                                    </div>
                                </div>

                                <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    p: ({ node, ...props }) => (
                                    <p
                                        className={`text-[12px] leading-relaxed mb-${Math.floor(Math.random() * 3) + 1}`}
                                        style={{
                                        transform: `rotate(${(Math.random() * 0.5 - 0.25).toFixed(3)}deg)`,
                                        marginLeft: `${(Math.random() * 9 - 3).toFixed(2)}px`, // shift between -3px and +3px
                                        }}
                                        {...props}
                                    />
                                    ),
                                    ul: ({ node, ...props }) => (
                                    <ul
                                        className="list-disc list-inside text-[10px] mb-2"
                                        {...props}
                                    />
                                    ),
                                    li: ({ node, ...props }) => (
                                    <li
                                        className={`mb-${Math.floor(Math.random() * 2) + 1}`}
                                        style={{
                                        transform: `rotate(${(Math.random() * 0.5 - 0.25).toFixed(3)}deg)`,
                                        }}
                                        {...props}
                                    />
                                    ),
                                    a: ({ node, ...props }) => (
                                    <a
                                        className="underline text-blue-600"
                                        {...props}
                                    />
                                    ),
                                    table: ({ node, ...props }) => (
                                        <table
                                          className="table-auto border-collapse border border-black text-left text-[12px] my-2 w-full font-normal"
                                          {...props}
                                        />
                                      ),
                                      thead: ({ node, ...props }) => (
                                        <thead className="font-normal" {...props} />
                                      ),
                                      th: ({ node, ...props }) => (
                                        <th
                                          className="border border-black px-1 py-0.5 font-normal"
                                          {...props}
                                        />
                                      ),
                                      td: ({ node, ...props }) => (
                                        <td
                                          className="border border-black px-1 py-0.5 align-top"
                                          {...props}
                                        />
                                      ),
                                      details: ({ node, ...props }) => (
                                        <details className="my-4" {...props} />
                                      ),
                                      summary: ({ node, ...props }) => (
                                        <summary className="cursor-pointer font-semibold text-[14px] mb-2" {...props} />
                                      ),
                                }}
                                >
                                {markdownContent[currentTab.name as keyof typeof markdownContent].front}
                                </ReactMarkdown>
                                </div>
                                </div>
                        </motion.div>
                        )
                      })
                    }
            </motion.div>
            
          <div className="relative" style={{ width: '13vw', height: '40vh' }}>
              {/* Animated Cover (foreground) */}
              <motion.div
                  className="absolute inset-0 origin-left"
                  initial={false}
                  animate={{ rotateY: notebookOpen ? -160 : 0 }}
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
                          setNotebookOpen(!notebookOpen);
                      }}
                  />

                  {/* Text fades out */}
                  <motion.div
                      className="absolute inset-0 flex items-center justify-center text-black text-xl drop-shadow -translate-y-10 pointer-events-none"
                      initial={false}
                      animate={{ opacity: notebookOpen ? 0 : 1 }}
                  >
                  {title}
                  </motion.div>


                  {/* Tabs on the cover */}
                  <motion.div
                      className="absolute inset-y-0 flex flex-col items-end pointer-events-auto"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: notebookOpen ? 0 : 1 }}
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
      </>
    );
  }