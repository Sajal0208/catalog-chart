import { formatText } from "@/utils/format-text";

export const CurrentPrice = ({ price, percentageChange, priceChange }: { price: number, percentageChange: number, priceChange: number }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="flex flex-row items-start justify-center gap-2">
        <span className="text-7xl font-bold text-[#1A243A]">{formatText(price.toString())}</span>
        <span className="text-2xl text-[#BDBEBF] font-normal"> USD</span>
      </div>
      <div className="flex flex-row items-start justify-center gap-1">
        <span className={`text-lg font-medium ${priceChange >= 0 ? 'text-[#67BF6B]' : 'text-[#EA3943]'}`}>
          {priceChange >= 0 ? '+' : '-'} {formatText(Math.abs(priceChange).toFixed(2).toString())}
        </span>
        <span className={`text-lg font-medium ${priceChange >= 0 ? 'text-[#67BF6B]' : 'text-[#EA3943]'}`}>
          ({priceChange >= 0 ? '+' : '-'}{Math.abs(percentageChange).toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};
