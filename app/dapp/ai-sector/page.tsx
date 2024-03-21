"use client";

import { PieChart } from "@/components/pie-chart";
import supabase from "@/lib/supabase";
import {
  Card,
  CardHeader,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";

const TokenTable = ({ tokens, title }: { tokens: any; title?: string }) => {
  return (
    <div className="p-1 border-2 border-gold rounded-xl">
      {title && <p className="p-4 text-2xl">{title}</p>}
      <Table removeWrapper>
        <TableHeader>
          <TableColumn className="text-lg">Token</TableColumn>
          <TableColumn className="text-lg">Price</TableColumn>
          <TableColumn className="text-lg">1D</TableColumn>
          <TableColumn className="text-lg">Market Cap</TableColumn>
        </TableHeader>
        <TableBody>
          {tokens.map((token: any) => (
            <TableRow
              key={token.id}
              className=" last:border-0 border-b-[0.2px] border-y-gray-500 h-10"
            >
              <TableCell className="text-lg">
                <div className="flex items-center space-x-3">
                  <Image
                    src={token.logo}
                    alt={token.name}
                    className="rounded-full w-10 h-10"
                  />
                  <span>
                    {token.name}
                    <span className="uppercase"> ({token.ticker})</span>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-lg">${token.price.toLocaleString()}</span>
              </TableCell>
              <TableCell
                className={clsx(
                  token.change1d >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="text-lg">
                  {Number(token.change1d).toFixed(2)}%
                </span>
              </TableCell>
              <TableCell>
                <span className="text-lg">
                  ${token.marketCap.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const AICryptoData = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [aiMarketData, setAiMarketData] = useState({
    marketCap: 0,
    dailyVolume: 0,
    tokens: [],
  });

  useEffect(() => {
    const getRecommended = async () => {
      const { data: tokens } = await supabase
        .from("recommended_tokens")
        .select("*");

      setRecommendedTokens(
        tokens?.map((el: any) => el.ticker.toLowerCase()) ?? []
      );
    };

    getRecommended();

    const channel = supabase
      .channel("recommended_tokens")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "recommended_tokens" },
        (payload) => {
          getRecommended();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const [recommendedTokens, setRecommendedTokens] = useState<string[]>([]);

  const fetchData = async (forceRefresh = false) => {
    const cacheKey = "aiCryptoData";
    const cachedData = localStorage.getItem(cacheKey);
    const isCacheValid =
      cachedData &&
      Date.now() - JSON.parse(cachedData).timestamp < 15 * 60 * 1000; // Cache duration of 15 minutes

    if (isCacheValid && !forceRefresh) {
      setAiMarketData(JSON.parse(cachedData).data);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            category: "artificial-intelligence",
          },
        }
      );

      const data = {
        marketCap: response.data.reduce(
          (acc: any, coin: any) => acc + coin.market_cap,
          0
        ) as number,
        dailyVolume: response.data.reduce(
          (acc: any, coin: any) => acc + coin.total_volume,
          0
        ) as number,
        tokens: response.data.map((coin: any) => ({
          name: coin.name,
          id: coin.id,
          logo: coin.image,
          price: coin.current_price,
          change1d: coin.price_change_percentage_24h,
          marketCap: coin.market_cap,
          ticker: coin.symbol,
        })),
      };

      setAiMarketData(data);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data })
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="container flex flex-col gap-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-2 border-gold">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-md font-normal mb-4">
              Crypto Ai Sector Market Cap
            </p>
            <h4 className="font-light text-4xl">
              {formatter.format(aiMarketData.marketCap)}
            </h4>
          </CardHeader>
        </Card>
        <Card className="p-4 border-2 border-gold">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-md font-normal mb-4">
              Crypto Ai Sector Daily Volume
            </p>
            <h4 className=" font-light text-4xl">
              {formatter.format(aiMarketData.dailyVolume)}
            </h4>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PieChart
          height={400}
          legendEnabled={false}
          title={"Market Cap Allocation Meter"}
          data={aiMarketData.tokens.map((el: any) => ({
            name: el.name,
            y: (el.marketCap / aiMarketData.marketCap) * 100,
            sliced: true,
            selected: false,
          }))}
        />

        <TokenTable
          title="Ai Sector Token Recommendations"
          tokens={aiMarketData.tokens.filter((el: any) =>
            recommendedTokens.includes(el.ticker.toLowerCase())
          )}
        />
      </div>

      <TokenTable title="Ai Sector Tokens" tokens={aiMarketData.tokens} />
    </main>
  );
};

export default AICryptoData;
