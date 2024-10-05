import { formatText } from "@/utils/format-text";

export const ChartStats = ({
  hoveredPoint,
  currentPrice,
  currentPriceY,
  data,
  padding,
  chartWidth,
  height,
}: {
  hoveredPoint: any;
  currentPrice: number;
  currentPriceY: number;
  data: any;
  padding: number;
  chartWidth: number;
  height: number;
}) => {
  return (
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
      {hoveredPoint && hoveredPoint.volume && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: '#1A243A',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 400
          }}
          className="text-sm text-gray-500 whitespace-nowrap"
        >
          Trading Volume: {formatText(hoveredPoint.volume.toString())}
        </div>
      )}
      {hoveredPoint && hoveredPoint.date && (
        <div
          style={{
            position: 'absolute',
            top: height - padding,
            left: 0,
            backgroundColor: '#1A243A',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 400
          }}
          className="text-sm text-gray-500 whitespace-nowrap"
        >
          Date: {hoveredPoint.date}
        </div>
      )}
    </div>
  )
}