"use client";

import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import Icons from "../global/icons";
import MaxWidthWrapper from "../global/max-width-wrapper";
import { buttonVariants } from "../ui/button";
import UserAccount from "../user-account";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface Props {
  user: User | null;
}

const Navbar = ({ user }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`top-0 z-50 sticky inset-x-0 transition-all duration-300  shadow-2xl bg-white ${
        isScrolled ? " shadow-2xl bg-white" : "bg-white"
      }`}
    >
      <div className="mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-all"
          >
            <Icons.logo className="w-10 h-10 transition-transform group-hover:rotate-12 group-hover:scale-110" />
            <span className="py-2 text-3xl rounded-full font-extrabold  text-blue-800  transition-all">
              Swasthya Darpan
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-[#6a11cb] via-[#2575fc] to-[#ff6ec4] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-all"
                >
                  Dashboard
                </Link>
                <UserAccount />
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="border-2 bg-transparent text-blue-500 hover:bg-blue-500 px-5 border-blue-500 rounded-full font-semibold py-1  text-lg hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:scale-105 shadow-md transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white bg-slate-200/75 rounded-md"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 bg-white/10 backdrop-blur-lg border-t border-white/10 shadow-2xl z-40 px-6 pb-4">
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md"
                >
                  Dashboard
                </Link>
                <UserAccount />
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-center px-4 py-2 border border-white/20 rounded-full backdrop-blur bg-white/10 text-white"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
                >
                  Start for Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
