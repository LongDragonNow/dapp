import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { localhost, mainnet } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Long Dragon",
  description:
    "The Long Dragon project has been created to address several challenges prevalent in current DeFi ecosystems",
  url: "https://longdragon.ai",
  icons: ["https://longdragon.ai/long-logo.webp"],
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [localhost, mainnet], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
  // ...wagmiOptions, // Optional - Override createConfig parameters
});
