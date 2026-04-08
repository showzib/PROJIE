import { Outlet, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavSearch, NavUser } from "@/components/ui/navbar-content";
import { 
  FileText, 
  LayoutDashboard, 
  Activity, 
  ClipboardList 
} from "lucide-react";

// Import logos
import smallLogo from "@/assets/sidemenulogo.png";
import fullLogo from "@/assets/projielogonew.png";

// Logo component
function ProjectLogo() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex items-center justify-center py-6 mb-4 border-b">
      {isCollapsed ? (
        <img 
          src={smallLogo}
          alt="Logo" 
          className="w-8 h-8 object-contain"
        />
      ) : (
        <img 
          src={fullLogo}
          alt="My Workspace" 
          className="h-10 w-auto object-contain"
        />
      )}
    </div>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();

  const menuItems = [
    { path: "/my-project", label: "My Project", icon: FileText },
    { path: "/my-boards", label: "My Boards", icon: LayoutDashboard },
    { path: "/activities", label: "Activities", icon: Activity },
    { path: "/task-request", label: "Task Request", icon: ClipboardList },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        
        <Sidebar collapsible="icon">
          <SidebarContent>
            <ProjectLogo />
            
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 items-center justify-between px-4 border-b bg-white sticky top-0 z-10 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger />
              <NavSearch />
            </div>
            <div className="flex items-center">
              <NavUser />
            </div>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}