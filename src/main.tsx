import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode>,
);
