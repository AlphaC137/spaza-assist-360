import { Upload, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  created_at: string;
  file_path: string;
}

const DocumentHub = () => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch documents
  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Document[];
    },
  });

  // Delete document mutation
  const deleteDocument = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Upload document mutation
  const uploadDocument = useMutation({
    mutationFn: async (file: File) => {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          name: file.name,
          type: file.type,
          file_path: filePath,
        });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Success",
        description: "Document uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Error",
          description: "File size must be less than 10MB",
          variant: "destructive",
        });
        return;
      }
      uploadDocument.mutate(file);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{translate(translations.documentHub)}</h1>
        <p className="text-gray-600">{translate(translations.documentHubDesc)}</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {translate(translations.uploadDocument)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload">
              <Button variant="secondary" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                {translate(translations.selectFile)}
              </Button>
            </label>
            <p className="mt-2 text-sm text-gray-500">
              {translate(translations.supportedFormats)}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {isLoading ? (
          <p>Loading documents...</p>
        ) : documents?.length === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          documents?.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteDocument.mutate(doc.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentHub;