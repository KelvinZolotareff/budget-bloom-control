
import { 
  Home, 
  CreditCard, 
  Menu,
  DollarSign,
  LineChart
} from "lucide-react";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarFooter,
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/"
  },
  {
    title: "Transações",
    icon: CreditCard,
    href: "/transacoes"
  },
  {
    title: "Investimentos",
    icon: LineChart,
    href: "/investimentos"
  }
];

export function Sidebar() {
  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center pl-4 h-14">
        <SidebarTrigger className="lg:hidden mr-2">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 text-budget-purple" />
          <span className="text-lg font-bold text-budget-dark ml-2">FinControl</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(
                    "flex items-center gap-2 text-base",
                    window.location.pathname === item.href && "bg-budget-purple-light text-budget-purple font-medium"
                  )}>
                    <Link to={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-muted-foreground">
        <div>FinControl © {new Date().getFullYear()}</div>
      </SidebarFooter>
    </SidebarComponent>
  );
}
