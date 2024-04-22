"use client";

import TokenTable from "@/components/token-table";
import supabase from "@/lib/supabase";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  AvatarGroup,
  Card,
  CardHeader,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const UserTokensTable = ({
  isLoading,
  tokens,
  title,
}: {
  isLoading: boolean;
  tokens: any;
  title?: string;
}) => {
  if (tokens.length === 0)
    return (
      <div className="p-1 border-2 border-gold rounded-xl overflow-x-scroll flex flex-col justify-center items-center gap-2">
        <p className="p-4 text-2xl">
          Please connect your wallet to see your tokens
        </p>
        <w3m-button />
      </div>
    );

  return (
    <div className="p-1 border-2 border-gold rounded-xl overflow-x-scroll">
      {title && <p className="p-4 text-2xl">{title}</p>}
      <Table
        removeWrapper
        bottomContent={
          isLoading ? (
            <div className="flex w-full justify-center">
              <Spinner color="white" />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn className="text-medium md:text-lg">Token</TableColumn>
          <TableColumn className="text-medium md:text-lg">Balance</TableColumn>
        </TableHeader>
        <TableBody>
          {tokens.map((token: any) => (
            <TableRow
              key={token.name}
              className=" last:border-0 border-b-[0.2px] border-y-gray-500 h-10"
            >
              <TableCell className="text-medium md:text-lg">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Avatar
                    size="md"
                    className="min-w-[40px] min-h-[40px]"
                    src={token.logo}
                    alt={token.name}
                  />
                  <span>
                    {token.name}
                    <span className="uppercase"> ({token.ticker})</span>
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-medium md:text-lg">
                  ${parseFloat(token.balance).toPrecision(4)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const CryptoData = () => {
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  const { address } = useAccount();

  const router = useRouter();

  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  const [userTokens, setUserTokens] = useState<
    {
      name: string | null;
      logo: string | null;
      balance: string;
      ticker: string | null;
    }[]
  >([]);

  const [marketData, setMarketData] = useState([]);

  const [allTokens, setAllTokens] = useState([]);

  const [categories, setCategories] = useState<
    {
      id: string;
      name: string;
      market_cap: number;
      market_cap_change_24h: number;
      volume_24h: number;
    }[]
  >([]);

  const [currentCategory, setCurrentCategory] = useState<{
    id: string;
    name: string;
    market_cap: number;
    market_cap_change_24h: number;
    volume_24h: number;
  }>({
    id: "artificial-intelligence",
    name: "Artificial Intelligence (AI)",
    market_cap: 0,
    market_cap_change_24h: 0,
    volume_24h: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getInfluencers = async () => {
      const { data: influencers } = await supabase
        .from("influencers")
        .select("*");

      setInfluencers(influencers as any);
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
  const [influencers, setInfluencers] = useState<
    | {
        name: string;
        twitter_handle: string;
        recommended_tickers: string;
      }[]
    | null
  >(null);

  const fetchCategories = async (forceRefresh = true) => {
    const cacheKey = "categories";
    const cachedData = localStorage.getItem(cacheKey);
    const isCacheValid =
      cachedData &&
      Date.now() - JSON.parse(cachedData).timestamp < 15 * 60 * 1000; // Cache duration of 15 minutes

    if (isCacheValid && !forceRefresh) {
      setCategories(JSON.parse(cachedData).data);
      setCurrentCategory(
        JSON.parse(cachedData).data.find(
          (el: any) => el.id === currentCategory.id
        )
      );
      return;
    }

    try {
      const response = await axios.get(
        `https://pro-api.coingecko.com/api/v3/coins/categories?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_CG_API_KEY}`
      );

      const filteredCategories = response.data.filter(
        (el: any) =>
          el.id === "artificial-intelligence" ||
          el.id === "layer-0-l0" ||
          el.id === "layer-1" ||
          el.id === "layer-2" ||
          el.id === "meme-token"
      );

      setCategories(filteredCategories);

      setCurrentCategory(
        filteredCategories.find((el: any) => el.id === currentCategory.id)
      );

      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: filteredCategories })
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchNeededTokens = async () => {
    if (!influencers) return;
    if (!recommendedTokens) return;

    try {
      const influencerTickers = influencers
        .map((influencer: any) => influencer.recommended_tickers)
        .flat();

      const tokenTickers = recommendedTokens.map((token: any) => token.ticker);

      const neededTokens = [...Array.from(tokenTickers), ...influencerTickers];

      const tokenIds = neededTokens.join(",");

      console.log(tokenIds);

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

  const fetchData = async (
    forceRefresh = true,
    category: string | undefined
  ) => {
    const categoryName = category || currentCategory.id;
    const cacheKey = categoryName;
    const cachedData = localStorage.getItem(cacheKey);
    const isCacheValid =
      cachedData &&
      Date.now() - JSON.parse(cachedData).timestamp < 15 * 60 * 1000; // Cache duration of 15 minutes

    if (isCacheValid && !forceRefresh) {
      setMarketData(JSON.parse(cachedData).data);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pro-api.coingecko.com/api/v3/coins/markets?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_CG_API_KEY}`,
        {
          params: {
            vs_currency: "usd",
            category: categoryName,
          },
        }
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

      setMarketData(data);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data })
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTokenBalances = async () => {
    if (!address) return;

    // Get token balances
    const balances = await alchemy.core.getTokenBalances(address);

    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return parseFloat(token.tokenBalance ?? "0.00") < 0;
    });

    // Get balance and format in terms of ETH
    let ethBalance = await alchemy.core.getBalance(address, "latest");
    let actualEthBalance = Utils.formatEther(ethBalance);

    const tokens: {
      name: string | null;
      logo: string | null;
      balance: string;
      ticker: string | null;
    }[] = [
      {
        name: "Ethereum",
        logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        balance: actualEthBalance,
        ticker: "ETH",
      },
    ];

    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;

      // Get metadata of token
      const metadata = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );

      // Compute token balance in human-readable format
      balance = (
        parseFloat(balance ?? "0") / Math.pow(10, metadata.decimals ?? 0)
      ).toFixed(2);

      tokens.push({
        name: metadata.name,
        logo: metadata.logo,
        balance,
        ticker: metadata.symbol,
      });
    }

    setUserTokens(tokens);
  };

  useEffect(() => {
    fetchCategories();
    fetchData(false, "artificial-intelligence");
  }, []);

  useEffect(() => {
    if (address) {
      getUserTokenBalances();
    }
  }, [address]);

  useEffect(() => {
    fetchNeededTokens();
  }, [influencers, recommendedTokens]);

  const [selectedCategory, setSelectedCategory] = useState(
    "artificial-intelligence"
  );

  return (
    <main className="container flex flex-col gap-4 mt-8">
      <Autocomplete
        classNames={{
          base: "w-full ",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500 text-3xl",
        }}
        label="Choose Category"
        allowsCustomValue={false}
        allowsEmptyCollection={false}
        variant="flat"
        defaultItems={categories.sort((a, b) => a.name.localeCompare(b.name))}
        placeholder="Search for a category"
        className="max-w-xs border-2 border-gold rounded-xl"
        selectedKey={selectedCategory}
        onSelectionChange={(selected) => {
          const category = categories.find((el) => el.id === selected);
          if (!category) return;
          setCurrentCategory(category);
          setSelectedCategory(category.id);
          fetchData(true, category.id);
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
        )}
      </Autocomplete>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-2 border-gold">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            {isLoading ? (
              <Spinner color="white" />
            ) : (
              <>
                <div className="w-full flex flex-row justify-between align-baseline items-baseline">
                  <p className="text-md font-normal mb-4">
                    {currentCategory.name} Sector Market Cap
                  </p>
                  <span className="text-tiny">24hr % change</span>
                </div>

                <div className="w-full flex flex-row justify-between items-center">
                  <h4 className="font-light text-2xl md:text-4xl">
                    {formatter.format(currentCategory.market_cap)}
                  </h4>

                  <h4
                    className={clsx(
                      "ml-auto text-xl md:text-2xl",
                      currentCategory.market_cap_change_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {currentCategory.market_cap_change_24h.toFixed(2)}%
                  </h4>
                </div>
              </>
            )}
          </CardHeader>
        </Card>
        <Card className="p-4 border-2 border-gold">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            {isLoading ? (
              <Spinner color="white" />
            ) : (
              <>
                <p className="text-md font-normal mb-4">
                  {currentCategory.name} Sector Daily Volume
                </p>
                <h4 className=" font-light text-2xl md:text-4xl">
                  {formatter.format(currentCategory.volume_24h)}
                </h4>
              </>
            )}
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <PieChart
          height={400}
          legendEnabled={false}
          title={"User Token Allocation Meter"}
          data={userTokens.map((el: any) => ({
            name: el.name,
            y: el.balance,
            sliced: true,
            selected: false,
          }))}
        /> */}

        <UserTokensTable
          isLoading={isLoading}
          title="Your Tokens"
          tokens={userTokens}
        />

        <div className="p-4 border-2 border-gold rounded-xl grid grid-cols-1 gap-3">
          {!influencers ? (
            <Spinner color="white" />
          ) : (
            <>
              <p className="text-2xl">KOL Coins</p>

              {influencers.map((influencer) => (
                <Card
                  shadow="md"
                  key={influencer.twitter_handle}
                  isPressable
                  onPress={() => {
                    router.push(
                      `/dapp/influencer/${influencer.twitter_handle}`
                    );
                  }}
                  className="p-4 w-full flex flex-row items-center justify-between gap-4"
                >
                  <User
                    name={influencer.name}
                    description={
                      <Link
                        href={`https://twitter.com/${influencer.twitter_handle}`}
                        size="sm"
                        isExternal
                      >
                        @{influencer.twitter_handle}
                      </Link>
                    }
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
                        <Avatar
                          key={token.id}
                          src={token.logo}
                          alt={token.name}
                        />
                      ))}
                  </AvatarGroup>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>

      <TokenTable
        isLoading={isLoading}
        title={`Top Picks`}
        tokens={allTokens.filter((el: any) =>
          recommendedTokens.includes(el.id)
        )}
      />

      <TokenTable
        isLoading={isLoading}
        title={`${currentCategory.name} Tokens`}
        tokens={marketData}
      />
    </main>
  );
};

export default CryptoData;
