"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../dashboard/sidebar";
import Icons from "../global/icons";
import { Button } from "../ui/button";
import UserAccount from "../user-account";

interface Props {
  isPro: boolean;
}

const DashboardNavbar = ({ isPro }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="top-0 z-50 sticky inset-x-0 backdrop-blur-xl bg-white/30 dark:bg-black/30 border-b border-indigo-200 dark:border-gray-700 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full p-9 px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-x-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="sm:hidden hover:scale-110 transition-transform duration-300"
              >
                <MenuIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl">
              <Sidebar show={false} setIsOpen={setIsOpen} />
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="flex items-center gap-2 hover:scale-101 transition-transform duration-300">
            <Icons.logo className="w-10 h-10 p-1 text-white rounded-full shadow-lg" />
            <span className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent p-12 bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-600">
              Swasthya Darpan
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isPro && (
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 hover:scale-105"
            >
              <Link href="/dashboard/account/billing">Upgrade</Link>
            </Button>
          )}
          <UserAccount />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
