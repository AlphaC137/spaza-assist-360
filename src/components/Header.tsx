import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/LanguageContext";

export function Header() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="border-b bg-white">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/741151a7-8521-4aa6-9347-ce6fdd93b1b1.png" 
            alt="Spaza Conecta Logo" 
            className="h-10 object-contain"
          />
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {session && (
            <Button variant="outline" onClick={handleSignOut}>
              {translate(translations.signOut)}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}