import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Index />
      </main>
      <Footer />
    </div>
  </TooltipProvider>
);

export default App;
