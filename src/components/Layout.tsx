
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  MenuIcon, 
  Moon, 
  Sun, 
  Bell 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Agregar API",
    path: "/add",
    icon: <PlusCircle className="h-5 w-5" />,
  },
  {
    title: "Buscar APIs",
    path: "/search",
    icon: <Search className="h-5 w-5" />,
  },
];

const Layout = () => {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1 rounded-md">
                <div className="font-bold text-xl">AM</div>
              </div>
              <span className="font-bold text-xl hidden sm:inline">API Marketplace</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-20 mt-16 w-64 border-r border-border bg-background transition-transform md:translate-x-0",
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 md:ml-64 p-4 sm:p-6 transition-all duration-300",
          mobileNavOpen && "blur-sm md:blur-none"
        )}>
          <Outlet />
        </main>
        
        {/* Mobile nav backdrop */}
        {mobileNavOpen && (
          <div 
            className="fixed inset-0 z-10 bg-black/20 md:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;
