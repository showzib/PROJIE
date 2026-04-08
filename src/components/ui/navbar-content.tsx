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
        className="pl-9 bg-slate-50/50 focus-visible:bg-white transition-all border-none shadow-none focus-visible:ring-1 focus-visible:ring-slate-200 dark:bg-slate-800/50 dark:focus-visible:bg-slate-800"
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
            <button className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 transition-all outline-none border cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700">
              <User className="size-5 text-slate-600 dark:text-slate-300" />
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 size-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 size-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              variant="destructive" 
              onClick={() => setShowLogoutDialog(true)}
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