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
    <div className="absolute inset-y-0 right-0 h-full w-full pointer-events-none">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setSelectedTab(tab.name)}
          className="absolute flex items-center justify-end pointer-events-auto"
          style={{ top: tab.topOffset, right: 0, width: '100%' }}
        >
          <div className="relative w-full" style={{ paddingTop: '60%' }}>
            <Image
              src={tab.asset}
              alt={`${tab.name} Tab`}
              fill
              style={{ objectFit: 'contain' }}
              className={`transition-transform duration-500 ${
                selectedTab === tab.name ? '-translate-x-full' : '-translate-x-1/2'
              }`}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
