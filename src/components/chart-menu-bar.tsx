import { useState } from 'react';
import { Tab } from './chart-component';

export const ChartMenuBar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => {
  const tabs = ['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'];

  return (
    <div className="flex justify-between items-center max-w-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-4 text-sm font-medium ${tab === activeTab ? 'text-[#1A243A] border-b-2 border-[#4B40EE]' : 'text-[#6F7177] hover:text-[#4B40EE]'}`}
          onClick={() => {
            setActiveTab(tab as Tab);
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};