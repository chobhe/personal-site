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
  selectedTabName: string;
  setSelectedTabName: (tab: string) => void;
  currentTabName: string; // default to 'About Me'
  currentTabLeft: boolean; // default to false (this is the side of the tabs)
  index?: number; // default to 0
  stopPropagation?: boolean; // default to false
  cover?: boolean; // default to false -> This is whether the tabs are on the cover or the inside of the notebook
}

export const tabs: Tab[] = [
  { name: 'About Me', asset: aboutMeTab, topOffset: '10%', crop: 50},
  { name: 'Work History', asset: workHistoryTab, topOffset: '30%', crop: 5},
  { name: 'Lists', asset: listsTab, topOffset: '50%', crop: 50},
];

export default function NotebookTabs({ selectedTabName, setSelectedTabName, currentTabName, currentTabLeft ,stopPropagation=false, cover=false}: NotebookTabsProps) {
  var tab = tabs.find((tab) => tab.name === currentTabName) || tabs[0];  // default to first tab if not found

  const { width, height } = tab.asset;
  const paddingTop = `${(height / width) * 70}%`;

  const isSelected = tab.name === selectedTabName;


  // Determine offset direction and value
  const cropStyle ={ right: `${tab.crop}%` };  // crop from right side if tabs on right

  const onClickFunction = (event: React.MouseEvent) => {
    setSelectedTabName(tab.name);
    if (stopPropagation) {
      event.stopPropagation();
    }
  };

  {
    return (
    <div className="h-full w-full pointer-events-none" style={{ 
        left:   currentTabLeft ? "95%" : "100%", 
        position: 'absolute' 
    }}>
      
        <button
          key={tab.name}
          onClick={(event) => onClickFunction(event)}
          className={`absolute flex pointer-events-auto ${ currentTabLeft ? 'justify-start' : 'justify-end'}`}
          style={{
            top: tab.topOffset,
            left:   currentTabLeft ? 0 : undefined,   // anchors right side if left is false
            right:   currentTabLeft ? undefined:0,   // anchors right side if left is false
            width: isSelected && cover === false ? '140%' : '100%',
            zIndex: isSelected ? 20 : 10,
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
              style={{ objectFit: 'cover'}}
            />
          </div>
        </button>
      </div>
    );
  }
}
