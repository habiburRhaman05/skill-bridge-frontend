"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Command, Search, Menu, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ToggleTheme from "../shared/toggleTheme";
import { cn } from "@/lib/utils";

const navLinks = [
  { id: 1, name: "Find Tutors", path: "/tutors" },
  { id: 2, name: "Become a Tutor", path: "/sign-up" },
  { id: 3, name: "About Us", path: "/about-us" },
];

export default function Header() {
  const currentPath = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const isDashboard = currentPath.startsWith("/dashboard") || currentPath.startsWith("/admin/dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/70">
      <div className=" max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left Side: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {isDashboard && (
            <SidebarTrigger className="h-9 w-9 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900" />
          )}
          
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <Command className="h-5 w-5" />
            </div>
            <span className="hidden text-lg font-bold tracking-tight sm:block">
              SkillBridge
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav 
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.id}
                href={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                {link.name}
                {/* Modern Hover Pill Effect */}
                {hoveredPath === link.path && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-lg bg-zinc-100 dark:bg-zinc-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                {/* Active Underline */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                  />
                )}
              </Link>
            );
          })}
        </nav>

     {/* Right Side Actions */}
<div className="flex items-center justify-end gap-2">
  <div className="hidden items-center sm:flex">
  
    <ToggleTheme />
  </div>

  <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

  {/* Modern Sign In Button */}
  <Link href="/sign-in">
    <Button 
    asChild
      variant="outline" 
      className="group relative h-9 px-5 rounded-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300"
    >
      <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
     <User2/>
        Sign In
        <span className="opacity-50 group-hover:translate-x-1 transition-transform duration-300">→</span>
      </span>
    </Button>
  </Link>

  {/* Mobile Search/Menu */}
  <Button variant="ghost" size="icon" className="md:hidden">
    <Menu className="h-5 w-5" />
  </Button>
</div>
      </div>
    </header>
  );
}