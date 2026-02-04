
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import UserLists from "@/features/admin/components/UserLists";




const UserManagement = () => {
 


  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
   
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase text-zinc-900 dark:text-white tracking-tighter">
            All Users
          </h1>
          <p className="text-zinc-500 font-medium text-sm tracking-tight">
            Manage permissions and access levels with precision.
          </p>
        </div>
        
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-[40px] overflow-hidden shadow-2xl shadow-indigo-500/5">
        <div className="overflow-x-auto">
          <Table className="border-separate border-spacing-0">
  <TableHeader>
    <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 hover:bg-transparent">
      {/* Matches the User Identity cell (px-8 or pl-6) */}
      <TableHead className="pl-6 h-14 font-bold text-[10px] uppercase tracking-[0.15em] text-zinc-500/80">
        User Identity
      </TableHead>

      {/* Matches the Role Badge cell */}
      <TableHead className="h-14 font-bold text-[10px] uppercase tracking-[0.15em] text-zinc-500/80">
        Classification
      </TableHead>

      {/* Matches the Status Selector (Aligned Right) */}
      <TableHead className="pr-6 h-14 text-right font-bold text-[10px] uppercase tracking-[0.15em] text-zinc-500/80">
        <div className="flex justify-end items-center gap-2">
          Account Status
        </div>
      </TableHead>
    </TableRow>
  </TableHeader>
  
  <TableBody>
    <UserLists />
  </TableBody>
</Table>
        </div>

      </div>
    </div>
  );
};

export default UserManagement;