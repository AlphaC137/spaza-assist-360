import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/LanguageContext";
import { BookOpen, Video, FileText } from "lucide-react";

const Resources = () => {
  const { translate } = useLanguage();

  const resources = [
    {
      icon: BookOpen,
      title: "Business Guides",
      description: "Essential guides for running your spaza shop effectively",
    },
    {
      icon: Video,
      title: "Training Videos",
      description: "Step-by-step video tutorials on business management",
    },
    {
      icon: FileText,
      title: "Templates",
      description: "Downloadable templates for business documents",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{translate(translations.resources)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.title} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">{resource.title}</h2>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;