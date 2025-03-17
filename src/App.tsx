import { BrowserRouter } from "react-router-dom";
import useDarkMode from "./components/hooks/useDarkMode";
import MotionButton from "./components/ui/MotionButton";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { QueryContextProvider } from "./components/context/QueryContext";
import AppRoutes from "./AppRoutes";

function App() {
  const queryClient = new QueryClient();
  const { toggleDarkMode } = useDarkMode();

  return (
    <>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <QueryContextProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </QueryContextProvider>
        </QueryClientProvider>
      </CookiesProvider>

      <MotionButton
        className="bg-primary-bg-1 text-primary-text-1"
        onClick={toggleDarkMode}
      >
        DarkModeToggle
      </MotionButton>

      <div className="flex gap-3">
        <div className="bg-primary-bg-1 text-primary-text-1 rounded border-2 p-3">
          <p>Primary 1</p>
          <p className="text-accent-1 font-bold"> Hallo</p>
        </div>
        <div className="bg-primary-bg-2 text-primary-text-2 rounded border-2 p-3">
          <p>Primary 2</p>
          <p className="text-accent-2 font-bold"> Hallo</p>
        </div>
        <div className="bg-primary-bg-3 text-primary-text-3 rounded border-2 p-3">
          <p>Primary 3</p>
          <p className="text-accent-3 font-bold"> Hallo</p>
        </div>
      </div>
    </>
  );
}

export default App;
