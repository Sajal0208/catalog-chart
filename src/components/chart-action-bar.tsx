import React from 'react';
import { TimeInterval } from './chart-component';
import { MdOpenInFull } from "react-icons/md";
import { MdCloseFullscreen } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";

export const ChartActionBar = ({ fullScreen, setFullScreen, timeInterval, setTimeInterval }: { fullScreen: boolean, setFullScreen: (fullScreen: boolean) => void, timeInterval: TimeInterval, setTimeInterval: (interval: TimeInterval) => void }) => {
  const timeIntervals = Object.values(TimeInterval);

  return (
    <div className="flex items-center space-x-2 gap-16">
      <div className="flex items-center gap-2">
        <button onClick={() => setFullScreen(!fullScreen)} className="p-2 rounded-md hover:bg-gray-100 text-[#6F7177] flex items-center gap-2 ">
          {fullScreen ? <MdCloseFullscreen /> : <MdOpenInFull />} Fullscreen
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 text-[#6F7177] flex items-center gap-2 ">
          <MdAddCircleOutline /> Compare
        </button>
      </div>
      <div className="flex rounded-md gap-1">
        {timeIntervals.map((interval) => (
          <button
            key={interval}
            className={`px-3 rounded-[5px] py-1 text-sm font-medium ${interval === timeInterval ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
              } ${interval === '1d' ? 'rounded-l-md' : ''} ${interval === 'max' ? 'rounded-r-md' : ''}`}
            onClick={() => setTimeInterval(interval as TimeInterval)}
          >
            {interval}
          </button>
        ))}
      </div>
    </div>
  );
};