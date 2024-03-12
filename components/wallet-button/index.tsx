import { Button } from "@nextui-org/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function WalletButton() {
  const { open } = useWeb3Modal();

  return (
    <Button
      color="primary"
      variant="ghost"
      radius="full"
      onPress={() => open()}
    >
      Connect wallet
    </Button>
  );
}
