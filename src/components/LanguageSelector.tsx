import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "zu", name: "isiZulu" },
  { code: "xh", name: "isiXhosa" },
];

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState("en");

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-primary" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={currentLang === lang.code ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentLang(lang.code)}
            className="text-sm"
          >
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  );
}