import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Sidebar (shadcn)
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Navbar (shadcn)
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">

        {/* SIDEBAR */}
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate("/my-project")}>
                  My Project
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* RIGHT SIDE CONTENT */}
        <SidebarInset>
          {/* NAVBAR */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <SidebarTrigger />

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink onClick={() => navigate("/my-project")}>
                    My Project
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* MAIN PAGE CONTENT */}
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}