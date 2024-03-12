"use client";

import { cn } from "@/lib/utils";
import {
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
import WalletButton from "./wallet-button";

export default function LandingNavigationBar({
  className,
}: {
  className?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: "Chart",
      href: "#chart",
    },
    {
      name: "Tokenomics",
      href: "#tokenomics",
    },
    {
      name: "Mission",
      href: "#mission",
    },
    {
      name: "Distribution",
      href: "#distribution",
    },
    {
      name: "Roadmap",
      href: "#roadmap",
    },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={cn(
        "md:border-2 md:rounded-3xl border-gold bg-black bg-opacity-70",
        className
      )}
      classNames={{
        item: ["data-[active=true]:bg-secondary"],
      }}
      maxWidth="full"
      height={100}
      isBlurred={isMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Image
            src="/long-logo.png"
            alt="Long Dragon"
            width={100}
            height={100}
          />
          <p className="font-thin text-inherit text-2xl">Long</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <WalletButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
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
