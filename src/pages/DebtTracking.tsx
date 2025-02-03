import { useQuery } from "@tanstack/react-query";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";

const DebtTracking = () => {
  const { translate } = useLanguage();

  const { data: debtors, isLoading } = useQuery({
    queryKey: ['debtors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('debtors')
        .select('*')
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="p-6">{translate(translations.loading)}</div>;
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Credit Log</h1>
      <div className="grid gap-4">
        {debtors?.map((debtor) => (
          <Card key={debtor.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{debtor.customer_name}</h3>
                <p className="text-sm text-gray-600">
                  Due: {format(new Date(debtor.due_date), 'PPP')}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-bold">R{debtor.amount}</p>
                <Badge 
                  variant={isOverdue(debtor.due_date) ? "destructive" : "secondary"}
                >
                  {isOverdue(debtor.due_date) ? (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Overdue
                    </div>
                  ) : (
                    'Pending'
                  )}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
        {debtors?.length === 0 && (
          <p className="text-center text-gray-600">No debt records found.</p>
        )}
      </div>
    </div>
  );
};

export default DebtTracking;