import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import AppRoutes from "./AppRoutes";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </CookiesProvider>

      <div className="flex gap-3">
        <div className="rounded border-2 bg-primary-bg-1 p-3 text-primary-text-1">
          <p>Primary 1</p>
          <p className="font-bold text-accent-1"> Hallo</p>
        </div>
        <div className="rounded border-2 bg-primary-bg-2 p-3 text-primary-text-2">
          <p>Primary 2</p>
          <p className="font-bold text-accent-2"> Hallo</p>
        </div>
        <div className="rounded border-2 bg-primary-bg-3 p-3 text-primary-text-3">
          <p>Primary 3</p>
          <p className="font-bold text-accent-3"> Hallo</p>
        </div>
      </div>
    </>
  );
}

export default App;
