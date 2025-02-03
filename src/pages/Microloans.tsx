import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/contexts/LanguageContext";

const Microloans = () => {
  const { translate } = useLanguage();
  
  const { isLoading } = useQuery({
    queryKey: ['microloans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('microloans')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="p-6">{translate(translations.loading)}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{translate(translations.availableMicroloans)}</h1>
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-xl text-gray-600 animate-fadeIn">
          {translate(translations.noLoans)}
        </p>
      </div>
    </div>
  );
};

export default Microloans;