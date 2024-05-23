import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import stakingAbi from "./lib/stakingAbi";
import tokenAbi from "./lib/tokenAbi";

export default defineConfig({
  out: "lib/generated.ts",
  contracts: [
    {
      name: "staking",
      abi: stakingAbi,
    },
    {
      name: "token",
      abi: tokenAbi,
    },
  ],
  plugins: [react()],
});
