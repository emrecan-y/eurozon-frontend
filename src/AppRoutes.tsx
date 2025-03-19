import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginLayout from "./components/layouts/LoginLayout";
import LoginPage from "./components/LoginPage";
import ProductGrid from "./components/product/ProductGrid";
import RegisterPage from "./components/RegisterPage";
import Layout from "./components/layouts/Layout";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "./components/queries/useUserQuery";
import { CartPage } from "./components/CartPage";

function AppRoutes() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userQuery = useUserQuery();

  useEffect(() => {
    if (cookies.access_token) {
      queryClient.invalidateQueries(["user"]);
      userQuery?.refetch();
      navigate("/");
    } else {
      console.log("removed");
      queryClient.resetQueries(["user"]);
    }
  }, [cookies]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductGrid />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
