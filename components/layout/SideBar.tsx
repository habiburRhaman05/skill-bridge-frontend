"use client"

import {
  DockIcon,
  LayoutDashboard,
  Lock,
  LogOut,
  Settings,
  User2,
  UserCircle
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"




const studentItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Booking", href: "/dashboard/bookings", icon: DockIcon },
  { title: "Profile", href: "/dashboard/profile", icon: User2 },
  { title: "Security", href: "/dashboard/security", icon: Lock },
]
const commonItems = [
  { title: "Explore Tutors", href: "/tutors", icon: LayoutDashboard }
]



const tutorItems = [
  { title: "Overview", href: "/tutor/dashboard", icon: LayoutDashboard },
  { title: "My Sessions", href: "/tutor/dashboard/sessions", icon: DockIcon },
  { title: "Add Availablity", href: "/tutor/dashboard/availablity", icon: Settings },
  { title: "My reviews", href: "/tutor/dashboard/my-reviews", icon: Settings },
  { title: "Profile", href: "/tutor/dashboard/profile", icon: Settings },
  { title: "Security", href: "/tutor/dashboard/security", icon: Settings },
]
const adminItems = [
  { title: "Overview", href: "/admin", icon: UserCircle },
  { title: "Manage bookings", href: "/admin/bookings", icon: Lock },
  { title: "Manage categories", href: "/admin/categories", icon: Lock },
  { title: "All Users", href: "/admin/users", icon: Lock },
];




export function DashboardSidebar({userRole}:{userRole:"ADMIN" | "STUDENT" | "TUTOR"}) {
  const pathname = usePathname()

  const sidebarLinks = {
    "ADMIN":adminItems,
    "STUDENT":studentItems,
    "TUTOR":tutorItems,
  }
  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href)

  const handleLogout = () => {
// handle logout logic
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className="top-16 hidden h-[calc(100vh-64px)] border-r border-border lg:block"
    >
      <SidebarContent className="bg-background text-foreground">
  
        <SidebarGroup className="px-4 py-2">
          <SidebarGroupLabel className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {userRole} Dashboard
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1.5">
            {sidebarLinks[userRole].map((item) => {
              const active = isActive(item.href)

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className={cn(
                      "relative flex items-center gap-3 rounded-md px-3 py-5 transition-all",
                      "hover:bg-muted hover:text-foreground",
                      active &&
                        "bg-muted text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    )}
                  >
                    <Link href={item.href}>
                      {active && (
                        <span className="absolute left-0 h-5 w-1 rounded-full bg-primary" />
                      )}
                      <item.icon className="h-[18px] w-[18px]" />
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Settings
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1.5">
            {commonItems.map((item) => {
              const active = isActive(item.href)

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-5 transition-all",
                      "hover:bg-muted hover:text-foreground",
                      active && "bg-muted text-foreground"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-[18px] w-[18px]" />
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Logout */}

        <div className="mt-auto border-t border-border p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
