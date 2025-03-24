import { Routes, Route } from "react-router-dom";
import LoginLayout from "./components/layouts/LoginLayout";
import LoginPage from "./components/LoginPage";
import ProductGrid from "./components/product/ProductGrid";
import RegisterPage from "./components/RegisterPage";
import ShopLayout from "./components/layouts/ShopLayout";
import { UserDataPage } from "./components/UserDataPage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import OrderHistory from "./components/orderHistory/OrderHistory";
import HomePage from "./components/homepage/HomePage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductGrid />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/user/data" element={<UserDataPage />} />
          <Route path="/orders" element={<OrderHistory />} />
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
