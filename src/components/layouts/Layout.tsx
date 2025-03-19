import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import NavBarCategories from "../navbar/NavBarCategories";

function Layout() {
  return (
    <div className="bg-primary-bg-1 text-primary-text-1 flex min-h-screen flex-col transition-colors duration-100">
      <Navbar />
      <div className="flex flex-1 h-full">
        <div className="bg-primary-bg-2 text-primary-text-2 hidden md:flex md:flex-col md:items-start md:gap-1 md:p-2 md:pt-1">
          <p className="font-bold">Kategorien</p>
          <NavBarCategories />
        </div>
        <div className="flex flex-1 flex-col h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
