"use client";

import TokenTable from "@/components/token-table";
import supabase from "@/lib/supabase";
import { Avatar, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Follow, Timeline } from "react-twitter-widgets";

export default function Page({
  params,
}: {
  params: { twitterHandle: string };
}) {
  const [allTokens, setAllTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [influencer, setInfluencer] = useState<any>(null);

  useEffect(() => {
    const getInfluencers = async () => {
      const { data: influencers } = await supabase
        .from("influencers")
        .select("*");

      setInfluencer(
        (influencers ?? []).find(
          (i) => i.twitter_handle === params.twitterHandle
        )
      );
    };

    getInfluencers();

    const channel = supabase
      .channel("influencers")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "influencers" },
        (payload) => {
          getInfluencers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNeededTokens = async () => {
    if (!influencer) return;

    try {
      const tokenTickers = influencer.recommended_tickers.map(
        (token: any) => token.ticker
      );

      const tokenIds = tokenTickers.join(",");

      const response = await axios.get(
        `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIds}&order=market_cap_desc&sparkline=false&locale=en&x_cg_pro_api_key=${process.env.NEXT_PUBLIC_CG_API_KEY}`
      );

      const data = response.data.map((coin: any) => ({
        name: coin.name,
        id: coin.id,
        logo: coin.image,
        price: coin.current_price,
        change1d: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        ticker: coin.symbol,
      }));

      setAllTokens(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchNeededTokens();
  }, [influencer]);

  if (!influencer) {
    return (
      <div className="container my-4 flex flex-col justify-center items-center ">
        <Spinner color="white" />
      </div>
    );
  }

  return (
    <div className="container my-4 flex flex-col justify-center items-center gap-3">
      <Avatar
        src={`https://unavatar.io/twitter/${influencer.twitter_handle}`}
        size="lg"
        className="border-2 border-gold h-28 w-28"
      />
      <h1 className="text-4xl font-bold">{influencer.name}</h1>

      <div
        className="border-2 border-gold rounded-full overflow-hidden flex flex-grow mb-4"
        style={{
          transform: "scale(1.5)",
        }}
      >
        <Follow
          username={influencer.twitter_handle}
          options={{ size: "large" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TokenTable
          isLoading={isLoading}
          title={`Token Holdings`}
          tokens={allTokens.filter((el: any) =>
            influencer.recommended_tickers.includes(el.id)
          )}
        />

        <div className="border-2 border-gold rounded-xl overflow-hidden flex flex-grow">
          <Timeline
            dataSource={{
              sourceType: "profile",
              screenName: influencer.twitter_handle,
            }}
            options={{
              chrome: "noheader, nofooter",
              theme: "dark",
              height: "600",
              width: "650",
              borderColor: "#b8a159",
            }}
          />
        </div>
      </div>
    </div>
  );
}
