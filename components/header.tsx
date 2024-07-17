"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/container";
import { UserButton, useClerk } from "@clerk/nextjs";
import MainNav from "./main-nav";
import CartActionButton from "./cart-action";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeaderProps {
  userId: string | null;
}

const Header = ({ userId }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full z-50 transition",
        scrolled
          ? "fixed top-0 left-0 bg-background2 shadow-lg"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link
            href="/"
            // className="uppercase flex gap-x-2 font-bold text-primary text-lg md:text-xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image src="/CODEWEB_TEXT_LOGO.png" alt="logo" width={140} height={20} />
          </Link>
          <div className="flex lg:hidden">
            <UserButton afterSignOutUrl="/" />
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 h-24 w-24 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <MainNav scrolled={scrolled} userId={userId} />
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userId ? (
              <div className="ml-4 flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
                <CartActionButton onClick={() => setMobileMenuOpen(false)} />
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/sign-in">
                  <Button variant="outline" className="bg-white text-black">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="text-black bg-primary hover:bg-red-700">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>

      <Dialog
        className="lg:hidden fixed text-white z-50"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-40" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background2 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only text-primary">CodeWeb</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 w-8 h-8 mx-8 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-10 w-10 mr-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 mb-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div onClick={() => setMobileMenuOpen(false)}>
                <MainNav
                  scrolled={scrolled}
                  mobile={true}
                  userId={userId}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
              </div>
              {userId ? (
                <div className="py-6 flex flex-col items-center justify-end gap-4">
                  <CartActionButton onClick={() => setMobileMenuOpen(false)} />{" "}
                </div>
              ) : (
                <div className="py-6">
                  <Link
                    href="/sign-in"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-Title"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>

                  <Link
                    href="/sign-up"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-Title"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
