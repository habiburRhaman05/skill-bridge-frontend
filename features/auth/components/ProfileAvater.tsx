
import {
  CreditCard,
  Settings,
  User,
  User2
} from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import LogoutButton from './logoutButton';


const ProfileAvater = ({user}:{user:any}) => {
 
  return (
 <>
 {true ? (
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
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none ml-2">
          <Avatar className="h-9 w-9 border-2 border-transparent hover:border-indigo-500 transition-all cursor-pointer shadow-sm">
            <AvatarImage src={user.profileAvater} alt={user.name} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64 p-2 mt-2" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none text-zinc-900 dark:text-zinc-100">{user.name}</p>
            <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400 mt-1 italic">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          {/* Profile Settings */}
          <DropdownMenuItem asChild className="cursor-pointer py-2.5 rounded-lg focus:bg-indigo-50 dark:focus:bg-indigo-950/30">
            <Link href="/account/profile" className="flex w-full items-center">
              <User className="mr-3 h-4 w-4 text-zinc-500" />
              <span className="font-medium">Profile Settings</span>
            </Link>
          </DropdownMenuItem>

          {/* Billing */}
          <DropdownMenuItem asChild className="cursor-pointer py-2.5 rounded-lg focus:bg-indigo-50 dark:focus:bg-indigo-950/30">
            <Link href="/account/billing" className="flex w-full items-center">
              <CreditCard className="mr-3 h-4 w-4 text-zinc-500" />
              <span className="font-medium">Billing & Plans</span>
            </Link>
          </DropdownMenuItem>

          {/* Account/Change Password Settings */}
          <DropdownMenuItem asChild className="cursor-pointer py-2.5 rounded-lg focus:bg-indigo-50 dark:focus:bg-indigo-950/30">
            <Link href="/account/settings" className="flex w-full items-center">
              <Settings className="mr-3 h-4 w-4 text-zinc-500" />
              <span className="font-medium">Account Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg text-red-600 focus:bg-red-50 dark:focus:bg-red-800/30 focus:text-red-600">
           <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> 
  )}
 </>
  )
}

export default ProfileAvater;