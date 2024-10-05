"use client";

import { useCrypto } from "@/hooks/useCrypto";
import { formatText } from "@/utils/format-text";
import { useEffect, useState } from "react";
import { Loading } from "./loading";
import { CurrentPrice } from "./current-price";
import { ChartMenuBar } from "./chart-menu-bar";
import { ChartActionBar } from "./chart-action-bar";
import Chart from "./chart";
import { Dialog, DialogContent } from "./modal";

export enum Tab {
  Summary = "Summary",
  Chart = "Chart",
  Statistics = "Statistics",
  Analysis = "Analysis",
  Settings = "Settings",
}

export enum TimeInterval {
  OneDay = "1d",
  ThreeDays = "3d",
  SevenDays = "7d",
  OneMonth = "1m",
  SixMonths = "6m",
  OneYear = "1y",
  Max = "max",
}

export enum Crypto {
  Bitcoin = "bitcoin",
  Ethereum = "ethereum",
}

export function ChartComponent() {
  const [fullscreen, setFullscreen] = useState(false);
  const cryptos = Object.values(Crypto);
  const [crypto, setCrypto] = useState<Crypto>(Crypto.Bitcoin);
  const [tab, setTab] = useState<Tab>(Tab.Chart);
  const [timeInterval, setTimeInterval] = useState<TimeInterval>(TimeInterval.OneYear);
  const { data, isLoading } = useCrypto(crypto, timeInterval);
  console.log(data);

  useEffect(() => {

  }, [data, crypto, timeInterval]);

  const handleTabChange = (tab: Tab) => {
    setTab(tab);
  }

  const handleCryptoChange = (crypto: Crypto) => {
    setCrypto(crypto);
  }

  const renderChart = (width: number, height: number) => {
    if (tab === Tab.Chart && !isLoading) {
      return <Chart data={data} width={width} height={height} />;
    }
    return null;
  };

  return (
    <div className='flex flex-col items-start justify-center p-4 w-full h-full gap-8'>
      <div className="flex items-center space-x-2">
        {cryptos.map((c) => (
          <button
            key={c}
            className={`px-4 py-2 rounded-md text-sm font-medium ${c === crypto
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            onClick={() => handleCryptoChange(c as Crypto)}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-4xl font-bold text-[#1A243A]">{crypto.toUpperCase()} / USD</p>
      {isLoading ? <Loading /> : <CurrentPrice price={data[data.length - 1]?.Price || 0} priceChange={data[data.length - 1]?.Price - data[data.length - 2]?.Price || 0} percentageChange={(data[data.length - 1]?.Price - data[data.length - 2]?.Price || 0) / data[data.length - 2]?.Price * 100} />}
      <div className="w-full border-b border-gray-200">
        <ChartMenuBar activeTab={tab} setActiveTab={handleTabChange} />
      </div>
      <div className="w-full">
        <ChartActionBar fullScreen={fullscreen} setFullScreen={setFullscreen} timeInterval={timeInterval} setTimeInterval={setTimeInterval} />
      </div>
      <div className="w-full">
        {fullscreen ? (
          <Dialog open={fullscreen} onOpenChange={setFullscreen}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center w-full h-full gap-4 bg-white">
              <div className="w-full flex justify-start">
                <ChartActionBar fullScreen={fullscreen} setFullScreen={setFullscreen} timeInterval={timeInterval} setTimeInterval={setTimeInterval} />
              </div>
              {renderChart(1080, 720)}
            </DialogContent>
          </Dialog>
        ) : (
          renderChart(720, 400)
        )}
      </div>
    </div>
  )
}
