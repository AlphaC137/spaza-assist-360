import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: "en", name: "English" },
  { code: "zu", name: "isiZulu" },
  { code: "xh", name: "isiXhosa" },
];

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 language-selector">
      <Globe className="h-4 w-4 text-primary" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLanguage === lang.code ? "default" : "ghost"}
            size="sm"
            onClick={() => setLanguage(lang.code)}
            className="text-sm"
          >
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
}