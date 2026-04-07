import * as React from "react";
import { LogOut, Globe } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
// Shadcn Button import karein
import { Button } from "@/components/ui/button"; 

export function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-nav-500 px-8 shadow-sm">
      
      {/* LEFT: Logo Section */}
      <div className="flex items-center gap-1 text-2xl font-bold tracking-tighter">
        <span className="text-[#1e2a5a]">PR</span>
        <Globe className="size-6 text-[#f5a623]" fill="#f5a623" />
        <span className="text-[#1e2a5a]">JEi</span>
      </div>

      {/* CENTER: Navigation Links */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/* Aapka Menu Trigger yahan aayega */}
            <NavigationMenuContent>
              {/* Menu items */}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* RIGHT: Shadcn Sign Out Button */}
      <Button 
        variant="ghost" 
        className="text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold gap-2"
        onClick={() => console.log("Logout Clicked")}
      >
        <LogOut className="size-5" />
        Sign out
      </Button>
    </header>
  );
}