"use client"
import { ReactNode } from "react";

import { motion } from "framer-motion";
import { LucideIcon, ChevronLeft, Bell, LogOut } from "lucide-react";
import { ProfilePopup } from "@/components/ProfilePopup";
import  ThemeToggle  from "@/components/shared/toggleTheme";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BookOpen, DollarSign, LayoutDashboard, Settings, Shield, Users } from 'lucide-react';
import { Role } from "@/interfaces";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  userName: string;
  userRole:Role
}

export function DashboardLayout({ children, title, subtitle, userName,userRole }: DashboardLayoutProps) {
  const location = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const role = location.startsWith("/admin") ? "Admin"
    : location.startsWith("/tutor") ? "Tutor"
    : location.startsWith("/moderator") ? "Moderator"
    : location.startsWith("/technician") ? "technician"
    : "Student";

  const initials = userName.split(' ').map(n => n[0]).join('');

  const navItems = {
   ADMIN:[
     { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Bookings", href: "/admin/bookings", icon: BookOpen },
    { label: "Verification", href: "/admin/verification", icon: Shield },
    { label: "Finance", href: "/admin/finance", icon: DollarSign },
    { label: "Settings", href: "/admin/settings", icon: Settings },
   ]
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-64'} fixed left-0 top-0 bottom-0 bg-card/50 border-r border-border flex flex-col transition-all duration-300 z-40`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SB</span>
              </div>
              <span className="text-sm font-bold text-foreground">SkillBridge</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground p-1">
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.ADMIN.map((item) => {
            const isActive = location === item.href || (item.href !== item[0]?.href && location.startsWith(item.href + '/'));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 ${collapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-xl z-30">
          <div>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <ProfilePopup userName={userName} userRole={role} avatarInitials={initials} />
          </div>
        </header>

        <main className="p-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
