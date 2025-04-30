
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEprStore } from "@/store/useEprStore";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import UploadWizard from "./pages/UploadWizard";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import Guidelines from "./pages/Guidelines";
import MaterialCodes from "./pages/MaterialCodes";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const { setUser } = useEprStore();

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadWizard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/material-codes" element={<MaterialCodes />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
