import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"; // ✅ Add this import

import { NavSearch, NavUser } from "@/components/ui/navbar-content";
import { 
  FileText, 
  LayoutDashboard, 
  Activity, 
  ClipboardList,
  Users,
  Building2,
  UserCircle,
  FileSearch,
} from "lucide-react";

// Import logos
import smallLogo from "@/assets/sidemenulogo.png";
import fullLogo from "@/assets/projielogonew.png";
import frameLogo from "@/assets/frame.png";

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

// Footer Logo Component
function FooterLogo() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="border-t mt-auto">
      {isCollapsed ? (
        <div className="flex justify-center py-4">
          <img 
            src={frameLogo}
            alt="Frame Logo" 
            className="w-6 h-6 object-contain"
          />
        </div>
      ) : (
        <div className="p-4 space-y-2">
          <div className="flex justify-center">
            <img 
              src={frameLogo}
              alt="Frame Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
          
          <div className="text-center text-xs text-muted-foreground">
            <span className="text-secondary-500 dark:text-primary-500">Powered by </span>
            <a 
              href="https://www.neksoft.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary text-blue-500 transition-colors underline-offset-2 hover:underline"
            >
              www.neksoft.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();

  // Main Menu Items
  const mainMenuItems = [
    { path: "/my-project", label: "My Project", icon: FileText },
    { path: "/my-boards", label: "My Boards", icon: LayoutDashboard },
    { path: "/activities", label: "Activities", icon: Activity },
    { path: "/task-request", label: "Task Request", icon: ClipboardList },
  ];

  // Management Menu Items
  const managementMenuItems = [
    { path: "/customer", label: "Customer", icon: UserCircle },
    { path: "/companies", label: "Companies", icon: Building2 },
    { path: "/team", label: "Team", icon: Users },
    { path: "/dsm-logs", label: "DSM Logs", icon: FileSearch },
  ];

  return (
  <TooltipProvider>
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        
        <Sidebar collapsible="icon" className="flex flex-col">
          <SidebarContent>
            <ProjectLogo />
            
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    tooltip={item.label}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <SidebarMenu>
              {managementMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    tooltip={item.label}
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <FooterLogo />
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 items-center justify-between px-4 border-b bg-white dark:bg-sidebar sticky top-0 z-10 gap-4">
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
      
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={3000}
        expand={false}
        visibleToasts={3}
        toastOptions={{
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
          className: 'my-toast',
        }}
      />
    </SidebarProvider>
  </TooltipProvider>
);
}