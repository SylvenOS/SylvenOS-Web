"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isLight, setIsLight] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "light";
      }
      return window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.body;
    root.classList.toggle("light", isLight);
  }, [isLight]);

  const toggleTheme = () => {
    const nextState = !isLight;
    setIsLight(nextState);
    localStorage.setItem("theme", nextState ? "light" : "dark");
  };

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Projects", href: "/projects" },
    { text: "Contributors", href: "/contributors" },
    { text: "About Us", href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[#050f1f] text-white z-50 flex items-center justify-between px-6 md:px-[8%]">
      {/* Logo Section */}
      <Link
        href="/"
        className="flex items-center gap-2.5 text-xl md:text-2xl font-extrabold tracking-wide cursor-pointer no-underline text-white"
      >
        <div className="relative w-10 h-10">
          <Image
            src="/IMG_20260628_143818.png"
            alt="Sylven OS Logo"
            fill
            sizes="40px"
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        <span>Sylven OS</span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex items-center gap-[35px] text-sm md:text-base list-none m-0 p-0 h-full">
        {navLinks.map((link, i) => {
          // Accurate trailing edge active route matches
          const isActive = pathname === link.href;

          return (
            <li key={i} className="relative flex items-center h-full">
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-medium
${
  isActive
    ? "bg-white text-[#0a1a33]"
    : "text-slate-300 hover:text-white hover:bg-white/5"
}`}
              >
                {link.text}

                {/* {isActive && (
                  <motion.div
                    layoutId="activeNavBorder"
                    className="absolute bottom-[5px] left-0 right-0 h-1 rounded-full bg-[#7EC8FF] shadow-[0_0_12px_rgba(126,200,255,0.6)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )} */}
              </Link>
            </li>
          );
        })}

        {/* Toggle Controller Layout */}
        <li className="ml-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual layout mode"
            className="w-[60px] h-[32px] bg-slate-950 border border-white rounded-[50px] relative cursor-pointer overflow-hidden p-1 flex items-center justify-between gap-1"
          >
            <span className="text-[10px] pl-1 ">🌙</span>
            <span className="text-[10px] pr-1 ">☀️</span>

            {/* Framer Motion Layout Key for Fluid State Shifts */}
            <motion.div
              className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-md"
              layout
              animate={{
                left: isLight ? "32px" : "4px",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {isLight ? (
                <Moon size={13} className="text-slate-950 fill-slate-950" />
              ) : (
                <Sun size={13} className="text-amber-500 fill-amber-500" />
              )}
            </motion.div>
          </button>
        </li>
      </ul>
    </nav>
  );
}
