import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Registration from "./pages/Registration";
import DocumentHub from "./pages/DocumentHub";
import Analytics from "./pages/Analytics";
import Compliance from "./pages/Compliance";
import Resources from "./pages/Resources";
import Microloans from "./pages/Microloans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <div className="flex">
                  <Navigation />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/auth" element={<Auth />} />
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <Index />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/registration"
                        element={
                          <ProtectedRoute>
                            <Registration />
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
                        path="/analytics"
                        element={
                          <ProtectedRoute>
                            <Analytics />
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
                        path="/microloans"
                        element={
                          <ProtectedRoute>
                            <Microloans />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
            <Sonner />
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;