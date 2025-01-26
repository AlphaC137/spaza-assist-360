import { Card } from "@/components/ui/card";
import { FileText, CheckSquare, BookOpen, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/LanguageContext";

const features = [
  {
    icon: FileText,
    titleKey: "registration",
    descriptionKey: "registerDesc",
    path: "/registration",
  },
  {
    icon: CheckSquare,
    titleKey: "compliance",
    descriptionKey: "complianceDesc",
    path: "/compliance",
  },
  {
    icon: BookOpen,
    titleKey: "resources",
    descriptionKey: "resourcesDesc",
    path: "/resources",
  },
  {
    icon: BarChart,
    titleKey: "analytics",
    descriptionKey: "analyticsDesc",
    path: "/analytics",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-warm animate-fadeIn">
      <div className="max-w-screen-xl mx-auto p-4 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          {translate(translations.welcome)}
        </h1>
        <p className="text-white text-center mb-8">
          {translate(translations.subtitle)}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.titleKey}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {translate(translations[feature.titleKey])}
                    </h2>
                    <p className="text-gray-600">
                      {translate(translations[feature.descriptionKey])}
                    </p>
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