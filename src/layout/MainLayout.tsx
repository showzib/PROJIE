import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
import { TooltipProvider } from "@/components/ui/tooltip";
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
import { cn } from "@/lib/utils";

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
        <img src={smallLogo} alt="Logo" className="w-8 h-8 object-contain" />
      ) : (
        <img src={fullLogo} alt="My Workspace" className="h-10 w-auto object-contain" />
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
          <img src={frameLogo} alt="Frame Logo" className="w-6 h-6 object-contain" />
        </div>
      ) : (
        <div className="p-4 space-y-2">
          <div className="flex justify-center">
            <img src={frameLogo} alt="Frame Logo" className="h-10 w-auto object-contain" />
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

// Menu Items Component
function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/my-project", label: "My Project", icon: FileText },
    { path: "/my-boards", label: "My Boards", icon: LayoutDashboard },
    { path: "/activities", label: "Activities", icon: Activity },
    { path: "/task-request", label: "Task Request", icon: ClipboardList },
    { path: "/customer", label: "Customer", icon: UserCircle },
    { path: "/companies", label: "Companies", icon: Building2 },
    { path: "/team", label: "Team", icon: Users },
    { path: "/dsm-logs", label: "DSM Logs", icon: FileSearch },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarMenu>
      {menuItems.map((item) => {
        const active = isActive(item.path);
        return (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton 
              onClick={() => navigate(item.path)}
              tooltip={item.label}
              className={cn(
                "transition-all duration-200 my-1 py-2.5",
                active && [
                  "bg-primary/15 text-primary",
                  "hover:bg-primary/20 hover:text-primary",
                  "font-semibold",
                  "shadow-sm"
                ],
                !active && [
                  "text-muted-foreground",
                  "hover:bg-accent hover:text-accent-foreground"
                ]
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-all duration-200",
                active && "scale-110 text-primary"
              )} />
              <span className="text-sm">{item.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export default function MainLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        {/* Main container with overflow-x-hidden to prevent side scroll */}
        <div className="flex w-full min-h-screen overflow-x-hidden">
          <Sidebar collapsible="icon" className="flex flex-col">
            <SidebarContent>
              <ProjectLogo />
              <MenuItems />
            </SidebarContent>
            <SidebarFooter>
              <FooterLogo />
            </SidebarFooter>
          </Sidebar>

          {/* SidebarInset with overflow-x-hidden */}
          <SidebarInset className="overflow-x-hidden">
            <header className="flex h-14 items-center justify-between px-4 border-b bg-white dark:bg-sidebar sticky top-0 z-10 gap-4">
              <div className="flex items-center gap-4 flex-1">
                <SidebarTrigger />
                <NavSearch />
              </div>
              <div className="flex items-center">
                <NavUser />
              </div>
            </header>
            {/* Main content with overflow-x-hidden */}
            <main className="p-6 overflow-x-hidden">
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