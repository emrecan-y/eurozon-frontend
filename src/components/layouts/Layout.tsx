import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import NavBarCategories from "../navbar/NavBarCategories";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="hidden md:flex md:flex-col md:items-start md:gap-1 md:pl-2 md:pt-1">
          <p className="font-bold">Kategorien</p>
          <NavBarCategories />
        </div>
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
