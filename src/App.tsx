import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import RenewableEnergy from "./pages/RenewableEnergy";
import EnergyConservation from "./pages/EnergyConservation";
import OperationsMaterials from "./pages/OperationsMaterials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/operations/renewable-energy" element={<RenewableEnergy />} />
            <Route path="/operations/energy-conservation" element={<EnergyConservation />} />
            <Route path="/operations/materials" element={<OperationsMaterials />} />
            <Route path="/operations/energy-emissions" element={<div className="p-6"><h1 className="text-2xl font-bold">Energy and Emissions</h1></div>} />
            <Route path="/operations/ghg-reduction" element={<div className="p-6"><h1 className="text-2xl font-bold">GHG Reduction</h1></div>} />
            <Route path="/operations/biodiversity" element={<div className="p-6"><h1 className="text-2xl font-bold">Biodiversity</h1></div>} />
            <Route path="/operations/operational-waste" element={<div className="p-6"><h1 className="text-2xl font-bold">Operational Waste</h1></div>} />
            <Route path="/operations/water" element={<div className="p-6"><h1 className="text-2xl font-bold">Water</h1></div>} />
            <Route path="/operations/water-savings" element={<div className="p-6"><h1 className="text-2xl font-bold">Water Savings</h1></div>} />
            <Route path="/operations/air-emission" element={<div className="p-6"><h1 className="text-2xl font-bold">Air Emission</h1></div>} />
            <Route path="/operations/post-consumer" element={<div className="p-6"><h1 className="text-2xl font-bold">Post Consumer Waste</h1></div>} />
            <Route path="/cs-legal" element={<div className="p-6"><h1 className="text-2xl font-bold">CS & Legal MIS</h1></div>} />
            <Route path="/csr" element={<div className="p-6"><h1 className="text-2xl font-bold">CSR MIS</h1></div>} />
            <Route path="/data-privacy" element={<div className="p-6"><h1 className="text-2xl font-bold">Data Privacy & Sec. Indicators</h1></div>} />
            <Route path="/human-resource" element={<div className="p-6"><h1 className="text-2xl font-bold">Human Resource MIS</h1></div>} />
            <Route path="/procurement" element={<div className="p-6"><h1 className="text-2xl font-bold">Procurement & Supply Chain</h1></div>} />
            <Route path="/investment" element={<div className="p-6"><h1 className="text-2xl font-bold">Responsible Investment MIS</h1></div>} />
            <Route path="/safety" element={<div className="p-6"><h1 className="text-2xl font-bold">Safety MIS</h1></div>} />
            <Route path="/stakeholder" element={<div className="p-6"><h1 className="text-2xl font-bold">Stakeholder Grievance MIS</h1></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
