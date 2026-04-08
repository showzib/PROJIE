import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, Search } from "lucide-react";

import { Input } from "@/components/ui/input"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutDialog } from "@/components/ui/LogoutDialog";
import { DarkModeToggle } from "@/components/ui/toggle";

export function NavSearch() {
  return (
    <div className="relative w-full max-w-sm group">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
      <Input 
        type="search" 
        placeholder="Search project..." 
        className="pl-9 bg-white border border-gray-100 focus-visible:bg-white transition-all focus-visible:ring-1 focus-visible:ring-slate-200 dark:bg-sidebar dark:border-gray-500 dark:focus-visible:bg-slate-800 dark:focus-visible:ring-slate-700"
      />
    </div>
  );
}

export function NavUser() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    setShowLogoutDialog(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle Button - Navbar mein direct dikhega */}
        <DarkModeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-all outline-none border border-gray-100 cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-gray-800">
              <User className="size-5 text-slate-600 dark:text-slate-300" />
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-56 mt-2 bg-white border border-gray-100 dark:bg-slate-800 dark:border-gray-800"
          >
            <DropdownMenuLabel className="text-slate-900 dark:text-slate-100">
              Account Settings
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
            
            <DropdownMenuItem 
              onClick={() => navigate("/profile")}
              className="text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 focus:bg-gray-50 dark:focus:bg-slate-700"
            >
              <User className="mr-2 size-4" /> Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => navigate("/settings")}
              className="text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 focus:bg-gray-50 dark:focus:bg-slate-700"
            >
              <Settings className="mr-2 size-4" /> Settings
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
            
            <DropdownMenuItem 
              variant="destructive" 
              onClick={() => setShowLogoutDialog(true)}
              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50"
            >
              <LogOut className="mr-2 size-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <LogoutDialog 
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  );
}