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
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const intervalInMs = days * millisecondsPerDay;

  if (days === 1) {
    return data.reverse();
  }

  const result: DataPoint[] = [];
  let lastTimestamp =
    new Date(data[data.length - 1].x).getTime() + intervalInMs;

  for (let i = data.length - 1; i >= 0; i--) {
    if (new Date(data[i].x).getTime() + intervalInMs <= lastTimestamp) {
      console.log("pushing data point", data[i]);
      result.push(data[i]);
      lastTimestamp = new Date(data[i].x).getTime();
    }
  }

  console.log("interval, result, ", interval, result);
  return result;
}
