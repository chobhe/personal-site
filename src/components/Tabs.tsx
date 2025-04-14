'use client';

import Image, { StaticImageData } from 'next/image';
import aboutMeTab from '@/assets/images/tabs/green-divider.png';
import workHistoryTab from '@/assets/images/tabs/grey-divider.png';
import listsTab from '@/assets/images/tabs/white-divider.png';

interface Tab {
  name: string;
  asset: StaticImageData;
  topOffset: string; // vertical offset
  crop?: number; // horizontal offset
}

interface NotebookTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  startIndex?: number; // default to 0
  endIndex?: number; // default to tabs.length
  stopPropagation?: boolean; // default to false
  left?: boolean; // default to false (this is the side of the tabs)
  cover?: boolean; // default to false -> This is whether the tabs are on the cover or the inside of the notebook
}

export const tabs: Tab[] = [
  { name: 'About Me', asset: aboutMeTab, topOffset: '10%', crop: 50 },
  { name: 'Work History', asset: workHistoryTab, topOffset: '30%', crop: 5 },
  { name: 'Lists', asset: listsTab, topOffset: '50%', crop: 50 },
];

export default function NotebookTabs({ selectedTab, setSelectedTab, startIndex = 0, endIndex = tabs.length, stopPropagation=false, left=false, cover=false}: NotebookTabsProps) {
  {
    return (
    <div className="h-full w-full pointer-events-none" style={{ 
        left: left ? "-95%" : "100%", 
        position: 'absolute' 
    }}>
      {tabs.slice(startIndex, endIndex).map((tab) => {
            const { width, height } = tab.asset;
            const insideNotebookSelectedTab = selectedTab === tab.name && cover === false;
            const paddingTop = `${(height / width) * 70}%`;


            // Determine offset direction and value
            const cropStyle = left
            ? { left: `${tab.crop}%` }    // crop from left side if tabs on left
            : { right: `${tab.crop}%` };  // crop from right side if tabs on right

            const onClickFunction = (event: React.MouseEvent) => {
              setSelectedTab(tab.name);
              if (stopPropagation) {
                event.stopPropagation();
              }
            };

            return (
              <button
                key={tab.name}
                onClick={(event) => onClickFunction(event)}
                className={`absolute flex pointer-events-auto ${left ? 'justify-start' : 'justify-end'}`}
                style={{
                  top: tab.topOffset,
                  left: left ? 0 : undefined,    // anchors left side if left is true
                  right: left ? undefined : 0,   // anchors right side if left is false
                  width: insideNotebookSelectedTab ? '140%' : '100%',
                  zIndex: selectedTab === tab.name ? 20 : 10,
                  paddingTop,
                }}
              >

                {/* Inner div positions image to create crop effect */}
                <div
                  className="absolute inset-0"
                  style={cropStyle}
                >
                  <Image
                    src={tab.asset}
                    alt={`${tab.name} Tab`}
                    fill
                    style={{objectPosition: left ? 'right':'left', objectFit: 'cover', backfaceVisibility: 'hidden' }}
                  />
                </div>
              </button>
            )})
        }
      </div>
    );
  }
}
