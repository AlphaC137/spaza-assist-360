import { Home, FileText, CheckSquare, FolderOpen, BarChart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/", className: "nav-home" },
  { icon: FileText, label: "Registration", path: "/registration", className: "nav-registration" },
  { icon: CheckSquare, label: "Compliance", path: "/compliance", className: "nav-compliance" },
  { icon: FolderOpen, label: "Document Hub", path: "/document-hub", className: "nav-document-hub" },
  { icon: BarChart, label: "Analytics", path: "/analytics", className: "nav-analytics" },
  { icon: BookOpen, label: "Resources", path: "/resources", className: "nav-resources" },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:relative bg-[#1A1F2C]/80 backdrop-blur-lg border-t border-white/10 md:border-t-0 p-2 md:p-4 shadow-lg">
      <div className="flex justify-around md:flex-col md:gap-2 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant={isActive ? "default" : "ghost"}
              className={`flex flex-col md:flex-row md:justify-start gap-1 h-auto py-2 
                ${isActive 
                  ? 'bg-primary text-primary-foreground hover:bg-secondary transition-colors' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'} 
                ${item.className}`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs md:text-sm">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}