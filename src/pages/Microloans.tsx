import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
      {(!microloans || microloans.length === 0) ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-xl text-gray-600 animate-fade-in">
            No available Loans at this time.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {microloans.map((loan) => (
            <Card key={loan.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{loan.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col gap-2">
                  <div><span className="font-semibold">Provider:</span> {loan.provider}</div>
                  <div><span className="font-semibold">Amount Range:</span> {loan.amount_range}</div>
                  {loan.requirements && (
                    <div><span className="font-semibold">Requirements:</span> {loan.requirements}</div>
                  )}
                  {loan.contact_info && (
                    <div><span className="font-semibold">Contact:</span> {loan.contact_info}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Microloans;