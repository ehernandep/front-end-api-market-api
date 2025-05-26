
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddApi from "./pages/AddApi";
import SearchApis from "./pages/SearchApis";
import ViewApi from "./pages/ViewApi";
import NotFound from "./pages/NotFound";
import { useApp } from "./hooks/useApp";

const queryClient = new QueryClient();

const App = () => {
  const { dashboardMetrics, apiCategories, apis } = useApp();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard dashboardMetrics={dashboardMetrics} apis={apis}/>} />
              <Route path="add" element={<AddApi apiCategories={apiCategories}/>} />
              <Route path="search" element={<SearchApis apiCategories={apiCategories} apis={apis} />} />
              <Route path="view/:id" element={<ViewApi/>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
