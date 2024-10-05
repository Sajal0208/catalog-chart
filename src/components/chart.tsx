'use client'
import { useState } from "react";

export default function Chart({ data }: { data: any[] }) {
  const width = 720;
  const height = 400;
  const padding = 0;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const maxY = Math.max(...data.map((point) => point.Price));
  const minY = 0;
  const yRange = maxY * 1.1 - minY;

  const xScale = (index: number) => (index / (data.length - 1)) * chartWidth + padding;
  const yScale = (value: number) => chartHeight - ((value - minY) / yRange) * chartHeight + padding;

  const linePath = data.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${xScale(index)} ${yScale(point.Price)}`
  ).join(' ');

  const verticalLines = 7;

  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number } | null>(null);
  const currentPrice = data[data.length - 1].Price;
  const currentPriceY = yScale(currentPrice);

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
        <path
          d={`${linePath} L ${xScale(data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`}
          fill="url(#pathGradient)"
          stroke="#4B40EE"
          strokeWidth="2"
        />

        {data.map((point, index) => {
          return (
            <circle
              onMouseEnter={() => setHoveredPoint({ x: xScale(index), y: yScale(point.Price) })}
              onMouseLeave={() => setHoveredPoint(null)}
              key={index}
              cx={xScale(index)}
              cy={yScale(point.Price)}
              r="1"
              fill="#4B40EE"
              cursor="pointer"
              z="100"
            />
          )
        })}
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
      <div className="relative">
        {
          hoveredPoint && (
            <div style={{
              position: 'absolute',
              top: hoveredPoint.y,
              transform: 'translate(-0%, -50%)',
              backgroundColor: '#1A243A',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              fontWeight: 400
            }}>
              {data[Math.round((hoveredPoint.x - padding) / (chartWidth / (data.length - 1)))].Price.toFixed(2)}
            </div>
          )
        }
        <div style={{
          position: 'absolute',
          top: currentPriceY,
          transform: 'translate(-0%, -50%)',
          backgroundColor: '#4B40EE',
          padding: '5px 10px',
          borderRadius: '5px',
          color: 'white',
          fontWeight: 400,
        }}>
          {currentPrice.toFixed(2)}
        </div>
      </div>
    </div >
  );
}