"use client";

import supabase from "@/lib/supabase";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Input,
  Textarea,
  User,
} from "@nextui-org/react";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";

function Manage() {
  const [isCodeValid, setIsCodeValid] = useState(false);

  const [influencers, setInfluencers] = useState<any>([]);
  const [tokens, setTokens] = useState<any>([]);
  const [editingInfluencer, setEditingInfluencer] = useState<any>(null);
  const [editingToken, setEditingToken] = useState<any>(null);

  const [allTokens, setAllTokens] = useState([]);
  const [tokenInfo, setTokenInfo] = useState<
    {
      id: string;
      symbol: string;
      name: string;
    }[]
  >([]);

  const checkCode = (code: string) => {
    setIsCodeValid(code === process.env.NEXT_PUBLIC_CODE);
  };

  // const fetchFullTokens = async () => {
  //   try {
  //     const tokenResponse = await axios.get(
  //       `https://pro-api.coingecko.com/api/v3/coins/list?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_CG_API_KEY}`
  //     );

  //     setTokenInfo(tokenResponse.data);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // };

  const fetchNeededTokens = async () => {
    try {
      const influencerTickers = influencers
        .map((influencer: any) => influencer.recommended_tickers)
        .flat();

      const tokenTickers = tokens.map((token: any) => token.ticker);

      const neededTokens = [...Array.from(tokenTickers), ...influencerTickers];

      const tokenIds = neededTokens.join(",");

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

  // Load data from the database
  useEffect(() => {
    const fetch = async () => {
      await fetchInfluencers();
      await fetchTokens();
    };
    fetch();
  }, []);

  const fetchInfluencers = async () => {
    let { data, error } = await supabase.from("influencers").select("*");
    if (error) console.log("error", error);
    else {
      setInfluencers(data);
    }
  };

  const fetchTokens = async () => {
    let { data, error } = await supabase.from("recommended_tokens").select("*");
    if (error) console.log("error", error);
    else {
      setTokens(data);
    }
  };

  useEffect(() => {
    fetchNeededTokens();
  }, [influencers, tokens]);

  // Add or update token
  const saveToken = async (token: any) => {
    const { data, error } = await supabase
      .from("recommended_tokens")
      .upsert(token);
    if (error) console.error("Error saving token", error);
    else fetchTokens(); // Refresh the list after saving
  };

  // Delete token
  const deleteToken = async (ticker: any) => {
    const { data, error } = await supabase
      .from("recommended_tokens")
      .delete()
      .match({ ticker });
    if (error) console.error("Error deleting token", error);
    else fetchTokens(); // Refresh the list after deletion
  };

  // Add or update influencer
  const saveInfluencer = async (influencer: any) => {
    const { data, error } = await supabase
      .from("influencers")
      .upsert(influencer);
    if (error) console.error("Error saving influencer", error);
    else fetchInfluencers(); // Refresh the list after saving
  };

  // Delete influencer
  const deleteInfluencer = async (id: any) => {
    const { data, error } = await supabase
      .from("influencers")
      .delete()
      .match({ id });
    if (error) console.error("Error deleting influencer", error);
    else fetchInfluencers(); // Refresh the list after deletion
  };

  const handleInfluencerSubmit = async (data: any) => {
    await saveInfluencer(data);
    // setEditingInfluencer(null); // Clear form after submission
  };

  const handleTokenSubmit = async (data: any) => {
    await saveToken(data);
    // setEditingToken(null); // Clear form after submission
  };

  if (!isCodeValid) {
    return (
      <div className="container">
        <p className="text-2xl font-normal text-center mt-4">Enter Code</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkCode((e.target as any).code.value);
          }}
          className="flex flex-col gap-2"
        >
          <Input type="text" id="code" placeholder="Enter code" required />
          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container pb-4">
      <p className="text-2xl font-normal text-center mt-4">Influencers</p>

      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="w-full">
          {influencers.map((influencer: any) => (
            <Card
              shadow="md"
              key={influencer.twitter_handle}
              className="p-4 w-full flex flex-row items-center gap-4 mb-2"
            >
              <User
                name={influencer.name}
                description={influencer.twitter_handle}
                avatarProps={{
                  src: `https://unavatar.io/twitter/${influencer.twitter_handle}`,
                }}
              />

              <AvatarGroup isBordered max={40}>
                {allTokens
                  .filter((el: any) =>
                    influencer.recommended_tickers.includes(el.id)
                  )
                  .map((token: any) => (
                    <Avatar key={token.id} src={token.logo} alt={token.name} />
                  ))}
              </AvatarGroup>

              <Button
                className="ml-auto"
                color="primary"
                variant="flat"
                onPress={() => setEditingInfluencer(influencer)}
              >
                Edit
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={() => deleteInfluencer(influencer.id)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </div>
        <InfluencerForm
          className="md:w-[600px]"
          influencer={editingInfluencer}
          onSave={handleInfluencerSubmit}
        />
      </div>
      <p className="text-2xl font-normal text-center mt-4">
        Recommended Tokens
      </p>
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="w-full flex flex-col gap-2">
          {allTokens
            .filter((el: any) =>
              (tokens?.map((el: any) => el.ticker) ?? []).includes(el.id)
            )
            .map((token: any) => (
              <Card key={token.id} className="flex flex-row p-4">
                <User
                  key={token.id}
                  name={token.name}
                  description={token.ticker}
                  avatarProps={{ src: token.logo }}
                />

                <Button
                  className="ml-auto"
                  color="danger"
                  variant="flat"
                  onPress={() => deleteToken(token.ticker)}
                >
                  Delete
                </Button>
              </Card>
            ))}
        </div>

        <TokenForm
          className="md:w-[600px]"
          token={editingToken}
          onSave={handleTokenSubmit}
        />
      </div>
    </div>
  );
}

function InfluencerForm({ influencer, onSave, className }: any) {
  const [twitterHandle, setTwitterHandle] = useState("");
  const [name, setName] = useState("");
  const [recommendedTickers, setRecommendedTickers] = useState([]);

  useEffect(() => {
    if (influencer) {
      setTwitterHandle(influencer.twitter_handle);
      setName(influencer.name);
      setRecommendedTickers(influencer.recommended_tickers || []);
    }
  }, [influencer]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSave({
      id: influencer?.id,
      twitter_handle: twitterHandle,
      name,
      recommended_tickers: recommendedTickers,
    });
  };

  return (
    <Card className={clsx(className, "p-2")}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          value={twitterHandle}
          onChange={(e) => setTwitterHandle(e.target.value)}
          placeholder="Twitter Handle"
          required
        />
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Textarea
          value={recommendedTickers.join(",").trim()}
          onChange={(e) =>
            setRecommendedTickers(
              e.target.value
                .trim()
                .split(",")
                .map((el) => el.trim()) as any
            )
          }
          placeholder="Recommended Tickers (comma-separated)"
        />
        <Button color="primary" type="submit">
          Save
        </Button>
      </form>
    </Card>
  );
}

function TokenForm({ token, onSave, className }: any) {
  const [ticker, setTicker] = useState("");

  // Effect to set form fields when editing an existing token
  useEffect(() => {
    if (token) {
      setTicker(token.ticker);
    }
  }, [token]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!ticker) {
      alert("Please provide a ticker.");
      return;
    }

    const actualTicker = ticker.includes(",")
      ? ticker.split(",")[0].trim()
      : ticker;
    // Prepare the data object to save
    const data = {
      id: token?.id, // Include the id if it's an update
      ticker: actualTicker.toLowerCase(),
    };

    // Call onSave prop passed from parent component
    onSave(data);

    // Reset the form
    if (!token) {
      setTicker("");
    }
  };

  return (
    <Card className={clsx(className, "p-2")}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          type="text"
          id="ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toLowerCase())}
          placeholder="Enter token ticker"
          required
        />
        <Button color="primary" type="submit">
          Save Token
        </Button>
      </form>
    </Card>
  );
}

export default Manage;
