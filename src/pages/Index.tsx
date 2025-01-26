import { Card } from "@/components/ui/card";
import { FileText, CheckSquare, BookOpen, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: FileText,
    title: "Business Registration",
    description: "Register your spaza shop and get all necessary permits",
    path: "/registration",
  },
  {
    icon: CheckSquare,
    title: "Compliance Checklist",
    description: "Track and maintain your business compliance",
    path: "/compliance",
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access guides and educational materials",
    path: "/resources",
  },
  {
    icon: BarChart,
    title: "Business Analytics",
    description: "Track your business performance",
    path: "/analytics",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-warm animate-fadeIn">
      <div className="max-w-screen-xl mx-auto p-4 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Welcome to Spaza Connect
        </h1>
        <p className="text-white text-center mb-8">
          Your complete solution for managing your spaza shop business
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;