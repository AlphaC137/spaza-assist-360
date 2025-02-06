import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare, BookOpen, BarChart, ArrowRight } from "lucide-react";
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
      <div className="max-w-screen-xl mx-auto p-4 pt-16 md:pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {translate(translations.welcome)}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {translate(translations.subtitle)}
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 transition-all"
            onClick={() => navigate("/registration")}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.titleKey}
                className="p-8 cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/95 backdrop-blur-sm"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-accent rounded-xl">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                      {translate(translations[feature.titleKey])}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {translate(translations[feature.descriptionKey])}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8">
            Trusted by Spaza Shop Owners Across South Africa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-4xl font-bold mb-2">100+</p>
              <p className="text-lg">Active Users</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-4xl font-bold mb-2">3</p>
              <p className="text-lg">Supported Languages</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-lg">Business Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;