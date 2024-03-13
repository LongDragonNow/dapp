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
import { toast } from "sonner";

export default function LandingNavigationBar({
  className,
}: {
  className?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Introduction",
      href: "#introduction",
    },
    {
      name: "More",
      href: "#more",
    },
    {
      name: "Roadmap",
      href: "#roadmap",
    },
    {
      name: "Tokenomics",
      href: "#tokenomics",
    },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={cn(
        "md:border-2 md:rounded-3xl border-gold bg-black bg-opacity-70 md:h-[100px]",
        className
      )}
      classNames={{
        item: ["data-[active=true]:bg-secondary"],
      }}
      maxWidth="full"
      // height={100}
      isBlurred={isMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
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
          <Button
            size="lg"
            color="primary"
            variant="ghost"
            onPress={() => {
              toast.custom((t) => (
                <div className="p-4 bg-black border-3 border-gold text-white flex flex-col justify-center items-center rounded-xl">
                  <div className="text-lg font-bold text-center">
                    Coming soon!
                  </div>
                  <div className="text-center">
                    <p>
                      The Long Dragon Dapp is currently under development and
                      will be available soon. Please check back later.
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
          >
            Enter Dapp
          </Button>
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
