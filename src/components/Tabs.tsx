'use client';

import Image, { StaticImageData } from 'next/image';
import aboutMeTab from '@/assets/images/tabs/green-divider.png';
import workHistoryTab from '@/assets/images/tabs/grey-divider.png';
import listsTab from '@/assets/images/tabs/white-divider.png';

interface Tab {
  name: string;
  asset: StaticImageData;
  topOffset: string; // vertical offset
}

interface NotebookTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  startIndex?: number; // default to 0
  endIndex?: number; // default to tabs.length
  stopPropagation?: boolean; // default to false
  left?: boolean; // default to false (this is the side of the tabs)
}

export const tabs: Tab[] = [
  { name: 'About Me', asset: aboutMeTab, topOffset: '10%' },
  { name: 'Work History', asset: workHistoryTab, topOffset: '30%' },
  { name: 'Lists', asset: listsTab, topOffset: '50%' },
];

export default function NotebookTabs({ selectedTab, setSelectedTab, startIndex = 0, endIndex = tabs.length, stopPropagation=false, left=false}: NotebookTabsProps) {
  {
    return (
    <div className="h-full w-full pointer-events-none" style={{ 
        left: left ? "-100%" : "100%", 
        position: 'absolute' 
    }}>
      {tabs.slice(startIndex, endIndex).map((tab) => {
            const { width, height } = tab.asset;
            const paddingTop = `${(height / width) * 70}%`;

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
                  width: '100%',        // Adjust this % to scale the width
                }}
              >
                <div className="relative w-full" style={{ paddingTop }}>
                  <Image
                    src={tab.asset}
                    alt={`${tab.name} Tab`}
                    fill
                    style={{objectPosition: 'left', objectFit: 'contain', backfaceVisibility: 'hidden' }}
                  />
                </div>
              </button>
            )})
        }
      </div>
    );
  }
}
