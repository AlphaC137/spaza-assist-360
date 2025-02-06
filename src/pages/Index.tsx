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
    <div className="min-h-screen bg-[#1A1F2C] animate-fadeIn">
      <div className="max-w-screen-xl mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {translate(translations.welcome)}
          </h1>
          <p className="text-xl md:text-2xl text-[#C8C8C9] mb-12 max-w-3xl mx-auto leading-relaxed">
            {translate(translations.subtitle)}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-secondary text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => navigate("/registration")}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.titleKey}
                className="p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3 text-white">
                      {translate(translations[feature.titleKey])}
                    </h2>
                    <p className="text-[#aaadb0] text-lg leading-relaxed">
                      {translate(translations[feature.descriptionKey])}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-12 text-white">
            Trusted by Spaza Shop Owners Across South Africa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <p className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">100+</p>
              <p className="text-lg text-[#aaadb0]">Active Users</p>
            </div>
            <div className="p-8 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <p className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">3</p>
              <p className="text-lg text-[#aaadb0]">Supported Languages</p>
            </div>
            <div className="p-8 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <p className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">24/7</p>
              <p className="text-lg text-[#aaadb0]">Business Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;