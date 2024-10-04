interface DataPoint {
  x: number;
  y: number;
}

export async function processDataForInterval(
  data: DataPoint[],
  interval: string
): Promise<DataPoint[]> {
  console.log("processing data for interval", interval);
  console.log("data length", data.length);
  const intervalMap: { [key: string]: number } = {
    "1d": 1,
    "3d": 3,
    "7d": 7,
    "1m": 30,
    "3m": 90,
    "6m": 180,
    "1y": 365,
    max: 365,
  };

  const days = intervalMap[interval] || 1;
  const result: DataPoint[] = [];

  if (days === 1) {
    for (let i = data.length - 1; i >= 0; i -= days) {
      result.push(data[i]);
    }

    return result;
  }

  for (let i = data.length - 1; i >= 0; i -= days) {
    result.push(data[i]);
  }

  console.log("interval, result length, ", interval, result.length);
  return result;
}
