import { processDataForInterval } from "@/utils/data-processing";
import data from "@/utils/data/bitcoin-market-price.json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const timeInterval = searchParams.get("timeInterval") || "1d";

  const processedData = await processDataForInterval(
    data["market-price"],
    timeInterval
  );

  return NextResponse.json(processedData);
}
