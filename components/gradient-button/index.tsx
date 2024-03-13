"use client";

import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export const GradientButton = () => {
  return (
    <Button
      onPress={() => {
        toast.custom((t) => (
          <div className="p-4 bg-black border-3 border-gold text-white flex flex-col justify-center items-center rounded-xl">
            <div className="text-lg font-bold text-center">Coming soon!</div>
            <div className="text-center">
              <p>
                The Long Dragon Dapp is currently under development and will be
                available soon. Please check back later.
              </p>
            </div>
            <Button
              color="primary"
              variant="ghost"
              onPress={() => {
                toast.dismiss(t);
              }}
              size="lg"
              className="mt-4"
            >
              Close
            </Button>
          </div>
        ));
      }}
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
