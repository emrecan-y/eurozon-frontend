import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex h-full flex-1 justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
