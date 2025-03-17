import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import useDarkMode from "./components/hooks/useDarkMode";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MotionButton from "./components/ui/MotionButton";
import Layout from "./components/layouts/Layout";
import LoginLayout from "./components/layouts/LoginLayout";
import ProductGrid from "./components/product/ProductGrid";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

function App() {
  const queryClient = new QueryClient();

  const { toggleDarkMode } = useDarkMode();

  return (
    <>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/products" element={<ProductGrid />} />
              </Route>
              <Route path="/" element={<LoginLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
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
