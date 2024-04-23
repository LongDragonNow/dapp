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

export default function NavigationBar({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems: {
    name: string;
    href: string;
  }[] = [];

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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
          {/* <w3m-button  /> */}
          <Button
            color="primary"
            radius="full"
            className="text-medium"
            onPress={() => {
              toast.custom((t) => (
                <div className="p-4 bg-black border-3 border-gold text-white flex flex-col justify-center items-center rounded-xl">
                  <div className="text-lg font-bold text-center">
                    Coming soon!
                  </div>
                  <div className="text-center">
                    <p>
                      Wallet Connect is under development and will be available
                      soon. Please check back later.
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
            Connect Wallet
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
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
