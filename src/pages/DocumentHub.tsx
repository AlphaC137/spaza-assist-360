import { Upload, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage, translations } from "@/contexts/LanguageContext";

const DocumentHub = () => {
  const { translate } = useLanguage();

  const documents = [
    { id: 1, name: "Business Registration.pdf", type: "Certificate", date: "2024-03-15" },
    { id: 2, name: "Food Safety Cert.pdf", type: "Certificate", date: "2024-02-28" },
    { id: 3, name: "Owner ID.pdf", type: "ID", date: "2024-03-10" },
  ];

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
            <Button variant="secondary">
              <Upload className="w-4 h-4 mr-2" />
              {translate(translations.selectFile)}
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              {translate(translations.supportedFormats)}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-500">
                    {doc.type} • {doc.date}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <FileText className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentHub;