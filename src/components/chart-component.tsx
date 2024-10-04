"use client";

import { useCrypto } from "@/hooks/useCrypto";
import { formatText } from "@/utils/format-text";
import { useEffect, useState } from "react";
import { Loading } from "./loading";
import { CurrentPrice } from "./current-price";
import { ChartMenuBar } from "./chart-menu-bar";
import { ChartActionBar } from "./chart-action-bar";

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
// #4B40EE
// #6F7177

export function ChartComponent() {
  const [crypto, setCrypto] = useState<string>("bitcoin");
  const [tab, setTab] = useState<Tab>(Tab.Chart);
  const [timeInterval, setTimeInterval] = useState<TimeInterval>(TimeInterval.OneYear);
  const { data, isLoading } = useCrypto(crypto, timeInterval);

  useEffect(() => {
  }, [data]);

  const handleTabChange = (tab: Tab) => {
    setTab(tab);
  }

  return (
    <div className='flex flex-col items-start justify-center p-4 w-full h-full gap-8'>
      <p className="text-4xl font-bold text-[#1A243A]">{crypto.toUpperCase()} / USD</p>
      {isLoading ? <Loading /> : <CurrentPrice price={data[0]?.y || 0} priceChange={data[0]?.y - data[1]?.y || 0} percentageChange={(data[0]?.y - data[1]?.y || 0) / data[1]?.y * 100} />}
      <div className="w-full border-b border-gray-200">
        <ChartMenuBar activeTab={tab} setActiveTab={handleTabChange} />
      </div>
      <div className="w-full">
        <ChartActionBar timeInterval={timeInterval} setTimeInterval={setTimeInterval} />
      </div>
    </div>
  )
}

