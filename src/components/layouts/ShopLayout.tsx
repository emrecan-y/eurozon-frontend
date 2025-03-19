import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import NavBarCategories from "../navbar/NavBarCategories";

function ShopLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-bg-1 text-primary-text-1 transition-colors duration-100">
      <Navbar />
      <div className="flex h-full flex-1">
        <div className="hidden bg-primary-bg-2 text-primary-text-2 md:flex md:flex-col md:items-start md:gap-1 md:p-2 md:pt-1">
          <p className="font-bold">Kategorien</p>
          <NavBarCategories />
        </div>
        <div className="flex h-full flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ShopLayout;
