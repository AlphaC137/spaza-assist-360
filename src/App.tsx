import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Resources from "./pages/Resources";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <BrowserRouter>
              <div className="flex">
                <Navigation />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/resources" element={<Resources />} />
                  </Routes>
                </div>
              </div>
            </BrowserRouter>
          </main>
        </div>
        <Toaster />
        <Sonner />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;