"use client";

import { useCrypto } from "@/hooks/useCrypto";
import { formatText } from "@/utils/format-text";
import { useEffect, useState } from "react";
import { Loading } from "./loading";
import { CurrentPrice } from "./current-price";
import { ChartMenuBar } from "./chart-menu-bar";
import { ChartActionBar } from "./chart-action-bar";
import Chart from "./chart";

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

// #4B40EE
// #6F7177

export function ChartComponent() {
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
        <ChartActionBar timeInterval={timeInterval} setTimeInterval={setTimeInterval} />
      </div>
      <div className="w-full">
        {tab === Tab.Chart && !isLoading && <Chart data={data} />}
      </div>
    </div>
  )
}

