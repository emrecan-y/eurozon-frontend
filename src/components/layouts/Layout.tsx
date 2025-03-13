import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import NavBarCategories from "../navbar/NavBarCategories";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="sticky hidden bg-red-600 md:flex md:flex-col">
          <NavBarCategories />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
