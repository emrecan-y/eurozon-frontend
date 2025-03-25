import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import NavBarCategories from "../navbar/NavBarCategories";

function ShopLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-bg-1 text-primary-text-1 transition-colors duration-100">
      <Navbar />
      <div className="grid flex-1 grid-cols-[auto,_minmax(0,1fr)]">
        <div className="hidden bg-primary-bg-2 text-primary-text-2 md:flex md:flex-col md:items-start md:gap-1 md:p-2 md:pt-1">
          <p className="font-bold">Kategorien</p>
          <NavBarCategories />
        </div>
        <div className="flex min-h-full w-screen flex-col md:w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ShopLayout;
