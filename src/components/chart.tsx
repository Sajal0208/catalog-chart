'use client'
import { formatText } from "@/utils/format-text";
import { useState } from "react";
import { ChartStats } from "./chart-stats";

export default function Chart({ data, width, height }: { data: any[], width: number, height: number }) {
  const padding = 0;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const maxY = Math.max(...data.map((point) => point.Price));
  const minY = 0;
  const yRange = maxY * 1.1 - minY;
  const volumeBarHeight = 40;
  const gapBetweenChartAndVolume = 10;
  const chartHeightWithVolume = chartHeight - volumeBarHeight - gapBetweenChartAndVolume;

  const xScale = (index: number) => (index / (data.length - 1)) * chartWidth + padding;
  const maxVolume = Math.max(...data.map((point) => point.Vol));
  const yScale = (value: number) => chartHeightWithVolume - ((value - minY) / yRange) * chartHeightWithVolume + padding;

  const linePath = data.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.Price)}`
  ).join(' ');

  const verticalLines = 7;

  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; volume: number; date: string } | null>(null);
  const currentPrice = data[data.length - 1].Price;
  const currentPriceY = yScale(currentPrice);

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const index = Math.round((x - padding) / (chartWidth / (data.length - 1)));
    const point = data[index];
    if (point) {
      setHoveredPoint({
        x: xScale(index),
        y: yScale(point.Price),
        volume: point.Vol,
        date: point.Date,
      });
    }
  };

  return (
    <div
      className='flex items-start justify-start'
      style={{
        width: '100%',
        height: height,
      }}>
      <svg
        style={{
          width,
          height,
          borderColor: 'linear-gradient(180deg, #E8E7FF 0%, rgba(255, 255, 255, 0) 100%)',
        }}
        className='border-[1px] border-t-0'
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="100%" stopColor="#E8E7FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          x={padding}
          y={padding}
          width={chartWidth}
          height={chartHeight}
          fill="url(#backgroundGradient)"
        />
        {Array.from({ length: verticalLines }).map((_, index) => (
          <line
            key={`vertical-${index}`}
            x1={padding + (index * chartWidth) / (verticalLines - 1)}
            y1={padding}
            x2={padding + (index * chartWidth) / (verticalLines - 1)}
            y2={height - padding}
            stroke="#E8E7FF"
            strokeWidth="1"
          />
        ))}

        {data.map((point, index) => {
          const barWidth = chartWidth / data.length;
          const volumeHeight = 5 + ((point.Vol / maxVolume) * (volumeBarHeight - 5));
          return (
            <rect
              key={`volume-${index}`}
              x={xScale(index) - barWidth / 2}
              y={chartHeight - volumeHeight}
              width={barWidth}
              height={volumeHeight}
              fill="#E6E8EB"
              opacity={2}
              cursor="pointer"
            />
          );
        })}
        <path
          d={linePath}
          fill="none"
          stroke="#4B40EE"
          strokeWidth="2"
        />

        {data.map((point, index) => (
          <circle
            key={index}
            cx={xScale(index)}
            cy={yScale(point.Price)}
            r="1"
            fill="#4B40EE"
            cursor="pointer"
            z="100"
          />
        ))}
        {hoveredPoint && (
          <>
            <line
              x1={hoveredPoint.x}
              y1={padding}
              x2={hoveredPoint.x}
              y2={height - padding}
              stroke="#999999"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <line
              x1={padding}
              y1={hoveredPoint.y}
              x2={width - padding}
              y2={hoveredPoint.y}
              stroke="#999999"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          </>
        )}
      </svg>
      <ChartStats
        hoveredPoint={hoveredPoint}
        currentPrice={currentPrice}
        currentPriceY={currentPriceY}
        data={data}
        padding={padding}
        chartWidth={chartWidth}
        height={height}
      />
    </div>
  );
}