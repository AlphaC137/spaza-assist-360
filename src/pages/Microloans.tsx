import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Microloans = () => {
  const { translate } = useLanguage();
  
  const { data: microloans, isLoading } = useQuery({
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
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Microloans</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {microloans?.map((loan) => (
          <Card key={loan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{loan.name}</CardTitle>
              <CardDescription>
                <div className="space-y-2 mt-2">
                  <p><span className="font-semibold">Provider:</span> {loan.provider}</p>
                  <p><span className="font-semibold">Amount Range:</span> {loan.amount_range}</p>
                  {loan.requirements && (
                    <p><span className="font-semibold">Requirements:</span> {loan.requirements}</p>
                  )}
                  {loan.contact_info && (
                    <p><span className="font-semibold">Contact:</span> {loan.contact_info}</p>
                  )}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Microloans;