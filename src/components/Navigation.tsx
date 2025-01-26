import { Home, FileText, CheckSquare, BookOpen, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: FileText, label: "Registration", path: "/registration" },
  { icon: CheckSquare, label: "Compliance", path: "/compliance" },
  { icon: BookOpen, label: "Resources", path: "/resources" },
  { icon: BarChart, label: "Analytics", path: "/analytics" },
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:relative md:border-t-0 p-2 md:p-4">
      <div className="flex justify-around md:flex-col md:gap-2 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant={isActive ? "default" : "ghost"}
              className="flex flex-col md:flex-row md:justify-start gap-1 h-auto py-2"
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