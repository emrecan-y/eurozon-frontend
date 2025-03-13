import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import useDarkMode from "./components/hooks/useDarkMode";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MotionButton from "./components/ui/MotionButton";
import Layout from "./components/layouts/Layout";
import LoginLayout from "./components/layouts/LoginLayout";
import ProductGrid from "./components/product/ProductGrid";

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  const { toggleDarkMode } = useDarkMode();

  return (
    <>
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

      <MotionButton className="bg-primary-bg" onClick={toggleDarkMode}>
        DarkModeToggle
      </MotionButton>
    </>
  );
}

export default App;
