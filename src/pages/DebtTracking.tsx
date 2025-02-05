import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const debtorSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  amount: z.string().transform((val) => Number(val)),
  due_date: z.string().min(1, "Due date is required"),
});

type DebtorFormValues = z.infer<typeof debtorSchema>;

const DebtTracking = () => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const form = useForm<DebtorFormValues>({
    resolver: zodResolver(debtorSchema),
    defaultValues: {
      customer_name: "",
      amount: "",
      due_date: "",
    },
  });

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

  const addDebtorMutation = useMutation({
    mutationFn: async (values: DebtorFormValues) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from('debtors')
        .insert({
          customer_name: values.customer_name,
          amount: values.amount,
          due_date: values.due_date,
          user_id: user.id,
          status: 'pending'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debtors'] });
      toast({
        title: "Success",
        description: "Debtor added successfully",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add debtor",
        variant: "destructive",
      });
      console.error("Error adding debtor:", error);
    },
  });

  const onSubmit = (values: DebtorFormValues) => {
    addDebtorMutation.mutate(values);
  };

  if (isLoading) {
    return <div className="p-6">{translate(translations.loading)}</div>;
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-6">Add New Debt Record</h1>
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (R)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={addDebtorMutation.isPending}
              >
                {addDebtorMutation.isPending ? "Adding..." : "Add Debt Record"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Customer Credit Log</h2>
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
    </div>
  );
};

export default DebtTracking;