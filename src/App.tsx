import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import Index from "@/pages/Index";
import Registration from "@/pages/Registration";
import Compliance from "@/pages/Compliance";
import Resources from "@/pages/Resources";
import Analytics from "@/pages/Analytics";
import DocumentHub from "@/pages/DocumentHub";
import Microloans from "@/pages/Microloans";
import DebtTracking from "@/pages/DebtTracking";
import Auth from "@/pages/Auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen">
              <Header />
              <div className="flex">
                <Navigation />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route
                      path="/registration"
                      element={
                        <ProtectedRoute>
                          <Registration />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/compliance"
                      element={
                        <ProtectedRoute>
                          <Compliance />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/resources"
                      element={
                        <ProtectedRoute>
                          <Resources />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/analytics"
                      element={
                        <ProtectedRoute>
                          <Analytics />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/document-hub"
                      element={
                        <ProtectedRoute>
                          <DocumentHub />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/microloans"
                      element={
                        <ProtectedRoute>
                          <Microloans />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/debt-tracking"
                      element={
                        <ProtectedRoute>
                          <DebtTracking />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/auth" element={<Auth />} />
                  </Routes>
                </main>
              </div>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;