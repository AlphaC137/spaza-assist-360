
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
    <div className="min-h-screen bg-[#1A1F2C] animate-fadeIn overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-16 lg:py-24">
        {/* Hero Section - Mobile Optimized */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary px-4">
            {translate(translations.welcome)}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-[#C8C8C9] mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            {translate(translations.subtitle)}
          </p>
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-primary hover:bg-secondary text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => navigate("/registration")}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Features Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.titleKey}
                className="p-6 md:p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 touch-manipulation"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                    <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 text-white">
                      {translate(translations[feature.titleKey])}
                    </h2>
                    <p className="text-[#aaadb0] text-base md:text-lg leading-relaxed">
                      {translate(translations[feature.descriptionKey])}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators - Mobile Optimized */}
        <div className="mt-16 md:mt-24 text-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 md:mb-12 text-white px-4">
            Trusted by Spaza Shop Owners Across South Africa
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="p-6 md:p-8 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <p className="text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">100+</p>
              <p className="text-base md:text-lg text-[#aaadb0]">Active Users</p>
            </div>
            <div className="p-6 md:p-8 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
              <p className="text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">3</p>
              <p className="text-base md:text-lg text-[#aaadb0]">Supported Languages</p>
            </div>
            <div className="p-6 md:p-8 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <p className="text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">24/7</p>
              <p className="text-base md:text-lg text-[#aaadb0]">Business Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
