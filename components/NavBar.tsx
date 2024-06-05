"use client";

import { cn } from "@/lib/utils";
import {
  Button,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";

export default function NavigationBar({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: {
    name: string;
    href: string;
  }[] = [
    {
      name: "Staking dApp",
      href: "./staking",
    },
    {
      name: "Sector dApp",
      href: "./sector",
    },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
      className={cn(
        "md:border-2 md:rounded-3xl border-gold bg-black bg-opacity-70 md:h-[100px]",
        className
      )}
      classNames={{
        item: ["data-[active=true]:bg-secondary"],
      }}
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            src="/long-logo.webp"
            alt="Long Dragon"
            width={100}
            height={100}
          />
          <p className="font-thin text-inherit text-2xl">Long</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            color="primary"
            variant="ghost"
            onPress={() => {
              (window as any).ethereum.request({
                method: "wallet_watchAsset",
                params: {
                  type: "ERC20",
                  options: {
                    address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
                    symbol: "LD",
                    decimals: 18,
                    image: "https://longdragon.ai/ld_token.png",
                  },
                },
              });
            }}
          >
            Add $LD to Metamask
          </Button>
        </NavbarItem>
        <NavbarItem>
          <w3m-button />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-4">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={"primary"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
