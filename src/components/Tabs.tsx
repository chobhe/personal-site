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
}

const tabs: Tab[] = [
  { name: 'About Me', asset: aboutMeTab, topOffset: '10%' },
  { name: 'Work History', asset: workHistoryTab, topOffset: '30%' },
  { name: 'Lists', asset: listsTab, topOffset: '50%' },
];

export default function NotebookTabs({ selectedTab, setSelectedTab }: NotebookTabsProps) {
  return (
    <div className="relative h-full w-full pointer-events-none translate-x-full" /* translate the container right in the x axis */ > 
      {tabs.map((tab) => {
        const { width, height } = tab.asset;
        const paddingTop = `${(height / width) * 70}%`;
        return (
          <button
            key={tab.name}
            onClick={() => setSelectedTab(tab.name)}
            className="absolute flex justify-end pointer-events-auto"
            style={{
              top: tab.topOffset,
              right: 0,
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
