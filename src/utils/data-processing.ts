interface DataPoint {
  Date: string;
  Price: number | string;
  Open: number | string;
  High: number | string;
  Low: number | string;
  Vol: number | string;
  Change: number | string;
}

export async function processDataForInterval(
  data: any,
  interval: string
): Promise<DataPoint[]> {
  try {
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
        const price =
          typeof data[i].Price === "number"
            ? data[i].Price
            : parseFloat(data[i].Price.replace(/,/g, ""));
        const open =
          typeof data[i].Open === "number"
            ? data[i].Open
            : parseFloat(data[i].Open.replace(/,/g, ""));
        const high =
          typeof data[i].High === "number"
            ? data[i].High
            : parseFloat(data[i].High.replace(/,/g, ""));
        const low =
          typeof data[i].Low === "number"
            ? data[i].Low
            : parseFloat(data[i].Low.replace(/,/g, ""));
        const vol =
          typeof data[i]["Vol."] === "number"
            ? data[i]["Vol."]
            : parseFloat(data[i]["Vol."].replace(/,/g, "").replace("K", "")) *
              1000;
        const change =
          typeof data[i]["Change %"] === "number"
            ? data[i]["Change %"]
            : parseFloat(data[i]["Change %"].replace(/,/g, ""));
        result.push({
          Date: data[i].Date,
          Price: price,
          Open: open,
          High: high,
          Low: low,
          Vol: vol,
          Change: change,
        });
      }

      return result.reverse();
    }

    for (let i = data.length - 1; i >= 0; i -= days) {
      const price =
        typeof data[i].Price === "number"
          ? data[i].Price
          : parseFloat(data[i].Price.replace(/,/g, ""));
      const open =
        typeof data[i].Open === "number"
          ? data[i].Open
          : parseFloat(data[i].Open.replace(/,/g, ""));
      const high =
        typeof data[i].High === "number"
          ? data[i].High
          : parseFloat(data[i].High.replace(/,/g, ""));
      const low =
        typeof data[i].Low === "number"
          ? data[i].Low
          : parseFloat(data[i].Low.replace(/,/g, ""));
      const vol =
        typeof data[i]["Vol."] === "number"
          ? data[i]["Vol."]
          : parseFloat(data[i]["Vol."].replace(/,/g, "").replace("K", "")) *
            1000;
      const change =
        typeof data[i]["Change %"] === "number"
          ? data[i]["Change %"]
          : parseFloat(data[i]["Change %"].replace(/,/g, ""));
      result.push({
        Date: data[i].Date,
        Price: price,
        Open: open,
        High: high,
        Low: low,
        Vol: vol,
        Change: change,
      });
    }

    return result.reverse();
  } catch (error) {
    console.error("Error processing data for interval:", interval, error);
    return [];
  }
}
