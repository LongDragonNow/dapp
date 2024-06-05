"use client";
import { config } from "@/app/config";
import {
  useReadStakingAprRate,
  useReadStakingLock,
  useReadStakingTotalStakedLdAmount,
  useReadTokenBalanceOf,
} from "@/lib/generated";
import stakingAbi from "@/lib/stakingAbi";
import tokenAbi from "@/lib/tokenAbi";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatUnits, parseUnits } from "viem/utils";
import { useAccount } from "wagmi";

const stakingAddress = process.env.NEXT_PUBLIC_STAKING_ADDRESS as `0x${string}`;
const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;

function StakingPage() {
  const { address, isConnected } = useAccount();

  const [amount, setAmount] = useState("");
  const [stakes, setStakes] = useState<
    {
      canClaimUnstakeRestake: boolean;
      stakedLdAmount: bigint;
      lastClaimed: bigint;
      index: number;
    }[]
  >([]);

  const {
    data: tokenBalance,
    error: readError,
    refetch: refetchTokenBalance,
  } = useReadTokenBalanceOf({
    address: tokenAddress,
    args: [address ?? "0x0"],
  });

  const { data: aprRate } = useReadStakingAprRate({
    address: stakingAddress,
  });

  const { data: totalStaked, refetch: refetchTotalStakedAmount } =
    useReadStakingTotalStakedLdAmount({
      address: stakingAddress,
    });

  const { data: stakingStatus } = useReadStakingLock({
    address: stakingAddress,
  });

  // Fetch stakes for the connected user
  const fetchStakes = async () => {
    if (!address) return;
    const userStakes = [];
    let index = 0;
    try {
      while (true) {
        const result = await readContract(config, {
          abi: stakingAbi,
          address: stakingAddress,
          functionName: "_stakeByUser",
          args: [address, BigInt(index)],
        });

        const unstakeOrClaimWindowOpen = await readContract(config, {
          abi: stakingAbi,
          address: stakingAddress,
          functionName: "canClaimOrUnstake",
          args: [result[1]],
        });

        userStakes.push({
          canClaimUnstakeRestake: unstakeOrClaimWindowOpen,
          stakedLdAmount: result[0],
          lastClaimed: result[1],
          index,
        });
        index++;
      }
    } catch (err) {
      // Break loop if no more stakes
    }
    setStakes(userStakes);
  };

  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isRestaking, setIsRestaking] = useState(false);

  // Actions
  const handleStake = async (e: any) => {
    e.preventDefault();

    try {
      setIsStaking(true);
      if (!address) throw new Error("Please connect your wallet.");
      if (!amount || parseFloat(amount) <= 0)
        throw new Error("Amount cannot be less than or equal to 0.");

      toast.loading("Checking LD allowance..");

      const result = await readContract(config, {
        abi: tokenAbi,
        address: tokenAddress,
        functionName: "allowance",
        args: [address, stakingAddress],
      });

      toast.dismiss();

      if (BigInt(result) < BigInt(parseUnits(amount, 18))) {
        toast.loading("Please approve LD token spending cap.");

        const hash = await writeContract(config, {
          abi: tokenAbi,
          address: tokenAddress,
          functionName: "approve",
          args: [stakingAddress, parseUnits(amount, 18)],
        });

        await waitForTransactionReceipt(config, {
          confirmations: 3,
          hash,
        });
      }

      toast.dismiss();

      toast.loading("Please sign the transaction to stake.");

      const hash = await writeContract(config, {
        abi: stakingAbi,
        address: stakingAddress,
        functionName: "stakeLd",
        args: [parseUnits(amount, 18)],
      });

      await waitForTransactionReceipt(config, {
        confirmations: 3,
        hash,
      });

      toast.dismiss();

      toast.success("You have sucessfully staked.");
      fetchStakes();
      refetchTokenBalance();
      refetchTotalStakedAmount();
    } catch (error) {
      toast.dismiss();

      toast.error(`Something went wrong: ${error}`);
    } finally {
      setIsStaking(false);
    }
  };

  const handleClaim = async (index: any) => {
    try {
      setIsClaiming(true);
      toast.loading("Please sign the transaction to claim rewards.");

      const hash = await writeContract(config, {
        abi: stakingAbi,
        address: stakingAddress,
        functionName: "claimRewards",
        args: [index],
      });

      await waitForTransactionReceipt(config, {
        confirmations: 3,
        hash,
      });

      toast.dismiss();

      toast.success("You have sucessfully claimed the rewards.");
      fetchStakes();
      refetchTokenBalance();
      refetchTotalStakedAmount();
    } catch (error) {
      toast.dismiss();

      toast.error(`Something went wrong: ${error}`);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleUnstake = async (amount: bigint, index: any) => {
    try {
      setIsUnstaking(true);
      // toast.loading("Please claim rewards before unstaking.");

      // const hash = await writeContract(config, {
      //   abi: stakingAbi,
      //   address: stakingAddress,
      //   functionName: "claimRewards",
      //   args: [index],
      // });

      // await waitForTransactionReceipt(config, {
      //   confirmations: 3,
      //   hash,
      // });

      // toast.dismiss();

      toast.loading("Please sign the transaction to unstake.");

      const unstakeHash = await writeContract(config, {
        abi: stakingAbi,
        address: stakingAddress,
        functionName: "unstakeLD",
        args: [amount, index],
      });

      await waitForTransactionReceipt(config, {
        confirmations: 3,
        hash: unstakeHash,
      });

      toast.dismiss();

      toast.success(
        "You have sucessfully claimed the rewards and unstaked LD tokens."
      );

      fetchStakes();
      refetchTokenBalance();
      refetchTotalStakedAmount();
    } catch (error) {
      toast.dismiss();

      toast.error(`Something went wrong: ${error}`);
    } finally {
      setIsUnstaking(false);
    }
  };

  const handleRestake = async (index: any) => {
    try {
      setIsRestaking(true);
      toast.loading("Please sign the transaction to restake.");

      const hash = await writeContract(config, {
        abi: stakingAbi,
        address: stakingAddress,
        functionName: "reStake",
        args: [index],
      });

      await waitForTransactionReceipt(config, {
        confirmations: 3,
        hash,
      });

      toast.dismiss();

      toast.success("You have sucessfully restaked.");
      fetchStakes();
      refetchTokenBalance();
      refetchTotalStakedAmount();
    } catch (error) {
      toast.dismiss();

      toast.error(`Something went wrong: ${error}`);
    } finally {
      setIsRestaking(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchStakes();
    }
  }, [isConnected, address]);

  function calculateRewards(stake: {
    stakedLdAmount: bigint;
    lastClaimed: bigint;
  }): string {
    if (!aprRate) return "N/A";

    // Current time in seconds since epoch
    const now = Math.floor(Date.now() / 1000);

    // Time since last claimed in seconds
    const lastClaimed = Number(stake.lastClaimed);

    // Time since last claimed in weeks
    const weeksStaked = (now - lastClaimed) / (7 * 24 * 60 * 60);

    // Convert weeksStaked to BigInt
    const weeksStakedBigInt = BigInt(Math.floor(weeksStaked));

    // Initial principle amount
    let principle = stake.stakedLdAmount;

    // Calculate rewards
    for (let i = 0; i < weeksStakedBigInt; i++) {
      const cur = (principle * BigInt(aprRate)) / BigInt(1000);
      const reward = cur / BigInt(52);
      principle += reward;
    }

    const rewards = principle - stake.stakedLdAmount;

    // If rewards are 0 return a nice message how many days until rewards are available
    if (rewards === BigInt(0)) {
      const daysUntilRewards =
        Math.floor(
          Number(
            (BigInt(lastClaimed) + BigInt(604800) - BigInt(now)) / BigInt(86400)
          )
        ) + 1;
      return `${daysUntilRewards} days until rewards available`;
    }

    return formatUnits(rewards / BigInt(10), 18);
  }

  const formattedTotalStaked = totalStaked
    ? formatUnits(BigInt(totalStaked), 18)
    : "Loading...";

  const formattedAprRate = aprRate
    ? `${BigInt(aprRate ?? 0) / BigInt(100)} %`
    : "Loading...";

  const formattedStakingStatus = stakingStatus ? "Disabled" : "Enabled";

  return (
    <div>
      <main className="container grid grid-cols-3 lg:grid-rows-12 gap-4 pt-4">
        <div
          style={{
            background: "url(/LiqPool.png) no-repeat center center",
            backgroundSize: "cover",
          }}
          className="col-span-3 lg:col-span-1 row-span-6 p-8 bg-black border-2 border-gold text-white flex flex-col justify-start items-start rounded-xl"
        >
          <div className="w-full flex flex-row justify-between items-start">
            <p className=" text-3xl">
              <span className=" text-gold">Liquidity</span>
              <br />
              Pool
            </p>

            <Chip
              className="bg-black"
              color={stakingStatus ? "danger" : "success"}
              variant="dot"
            >
              {formattedStakingStatus}
            </Chip>
          </div>

          {address ? (
            <>
              <p>{readError && <div>Error: {readError.message}</div>}</p>

              <form
                onSubmit={handleStake}
                className="my-4 w-full flex-row gap-2"
              >
                <Input
                  disabled={isStaking || stakingStatus || !tokenBalance}
                  size="lg"
                  radius="sm"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  isInvalid={
                    tokenBalance
                      ? parseFloat(amount) >
                        parseFloat(formatUnits(tokenBalance, 18))
                      : false
                  }
                  errorMessage="Amount exceeds available balance."
                  placeholder="Amount to stake"
                  label="Stake $LD tokens"
                  labelPlacement="outside"
                  description={`Available Balance: ${
                    tokenBalance
                      ? `${Number(formatUnits(tokenBalance, 18)).toLocaleString()} LD`
                      : "Loading..."
                  }`}
                  startContent={
                    <Avatar
                      radius="full"
                      className="w-[60px]"
                      src="/ld_token.png"
                      alt="LD Token"
                    />
                  }
                  endContent={
                    <Button
                      disabled={stakingStatus}
                      size="sm"
                      color="primary"
                      variant="light"
                      onPress={() =>
                        setAmount(formatUnits(tokenBalance ?? BigInt(0), 18))
                      }
                    >
                      Max
                    </Button>
                  }
                />
                <Button
                  isLoading={isStaking}
                  className="mt-2"
                  color="primary"
                  variant="bordered"
                  type="submit"
                  disabled={
                    isStaking ||
                    stakingStatus ||
                    (tokenBalance
                      ? parseFloat(amount) >
                        parseFloat(formatUnits(tokenBalance, 18))
                      : true) ||
                    parseFloat(amount) <= 0
                  }
                >
                  Stake
                </Button>
              </form>

              <Divider className="my-2" />

              <div className="w-full flex flex-row justify-between items-center">
                <p>
                  <span className=" text-gold">Staked $LD</span> <br />
                  <span className="text-2xl">
                    {Number(formattedTotalStaked).toLocaleString() === "NaN"
                      ? "0"
                      : Number(formattedTotalStaked).toLocaleString()}
                  </span>
                </p>

                <p>
                  <span className=" text-gold">APR</span> <br />
                  <span className="text-2xl">
                    {formattedAprRate.toString()}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <p>Connect your wallet to stake.</p>
          )}
        </div>
        {/* Second  */}
        <div
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0, 0.8), rgba(0,0,0, 0.8)),url(/warchest.png) no-repeat center center",
            backgroundSize: "cover",
          }}
          className="relative col-span-3 lg:col-span-1 row-span-6 p-8 border-2 border-gold text-white flex flex-col justify-start items-start rounded-xl"
        >
          <div className="w-full flex flex-row justify-between items-start">
            <p className=" text-3xl">
              <span className=" text-gold">War</span>
              <br />
              Chest
            </p>

            <Chip className="bg-black" color="warning" variant="dot">
              Under Development
            </Chip>
          </div>

          <p>Coming Soon.</p>
        </div>
        {/* Third  */}
        <div
          style={{
            background: "url(/airdropfarm.png) no-repeat center center",
            backgroundSize: "cover",
          }}
          className="col-span-3 lg:col-span-1 row-span-6 p-8 bg-black border-2 border-gold text-white flex flex-col justify-start items-start rounded-xl"
        >
          <div className="w-full flex flex-row justify-between items-start">
            <p className=" text-3xl">
              <span className=" text-gold">Airdrop</span>
              <br />
              Farm
            </p>

            <Chip className="bg-black" color="warning" variant="dot">
              Under Development
            </Chip>
          </div>

          <p>Coming Soon.</p>
        </div>
        {/* End Second row */}

        {/* First row */}
        <div
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0, 0.8), rgba(0,0,0, 0.8)),url(/longsidelogo.png) no-repeat right bottom",
            backgroundSize: "60%",
          }}
          className="col-span-3 row-span-6 p-8 bg-black border-2 border-gold text-white flex flex-col gap-2 justify-start items-start rounded-xl"
        >
          <p className=" text-3xl">
            <span className=" text-gold">Your</span>
            <br />
            Stakes
          </p>

          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Stake Amount</TableColumn>
              <TableColumn>Staked/Last Claimed</TableColumn>
              <TableColumn>Rewards Estimate</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Stake $LD tokens to see data"}>
              {stakes.map((stake, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {Number(
                      formatUnits(BigInt(stake.stakedLdAmount), 18)
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      Math.floor(Number(stake.lastClaimed * BigInt(1000)))
                    ).toDateString()}
                  </TableCell>
                  <TableCell>{calculateRewards(stake)}</TableCell>
                  <TableCell>
                    {stake.canClaimUnstakeRestake ? (
                      <div className="flex flex-row gap-2">
                        <Button
                          isLoading={isRestaking}
                          color="primary"
                          variant="flat"
                          disabled={
                            isStaking ||
                            isRestaking ||
                            isUnstaking ||
                            isClaiming ||
                            !stake.canClaimUnstakeRestake
                          }
                          onClick={() => handleRestake(stake.index)}
                        >
                          {isRestaking ? "Confirming..." : "Restake"}
                        </Button>
                        {/* <Button
                          isLoading={isClaiming}
                          color="primary"
                          variant="flat"
                          disabled={
                            isStaking ||
                            isRestaking ||
                            isUnstaking ||
                            isClaiming ||
                            !stake.canClaimUnstakeRestake
                          }
                          onClick={() => handleClaim(stake.index)}
                        >
                          {isClaiming ? "Confirming..." : "Claim Rewards"}
                        </Button> */}
                        <Button
                          isLoading={isUnstaking}
                          color="danger"
                          variant="flat"
                          disabled={
                            isStaking ||
                            isRestaking ||
                            isUnstaking ||
                            isClaiming ||
                            !stake.canClaimUnstakeRestake
                          }
                          onClick={() =>
                            handleUnstake(stake.stakedLdAmount, stake.index)
                          }
                        >
                          {isUnstaking ? "Confirming..." : "Unstake"}
                        </Button>
                      </div>
                    ) : (
                      <Chip
                        className="px-3 flex flex-row gap-1"
                        startContent={<Info size={16} />}
                        variant="light"
                        color="primary"
                      >
                        Available on{" "}
                        {new Date(
                          new Date().setDate(
                            new Date(
                              Math.floor(
                                Number(stake.lastClaimed * BigInt(1000))
                              )
                            ).getDate() + 7
                          )
                        ).toDateString()}
                      </Chip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* End first row */}
      </main>
    </div>
  );
}

export default StakingPage;
