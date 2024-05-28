"use client";

import { Button, Link } from "@nextui-org/react";

export const GradientButton = () => {
  return (
    <Button
      as={Link}
      href="/dapp/staking"
      size="lg"
      className="mt-4 relative inline-flex overflow-hidden rounded-xl w-[200px] h-[60px] p-[1px]"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#b8a159_0%,#f5d778_50%,#fcf4d9_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-black px-3 text-xl font-medium text-white backdrop-blur-3xl">
        Enter Dapp
      </span>
    </Button>
  );
};
