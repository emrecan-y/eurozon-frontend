import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";
import MotionButton from "../ui/MotionButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import NavBarCategories from "./NavBarCategories";
import NavBarSearchBar from "./NavBarSearchBar";
import { Menu, Moon, ShoppingCart, Sun, User, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetShoppingCartPositions } from "../queries/useShoppingCartQuerys";
import useDarkMode from "../../hooks/useDarkMode";
import { useAuthUser } from "../../hooks/useAuthUser";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const shoppingCartPositionsQuery = useGetShoppingCartPositions();

  const { user, logout } = useAuthUser();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  const location = useLocation();
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <div className="sticky top-0 z-20 h-fit w-screen text-accent-2 shadow-md">
      <div className="grid grid-cols-3 gap-1 bg-primary-bg-2 p-1 md:p-3">
        <Tooltip>
          <TooltipTrigger asChild className="w-fit">
            <MotionButton
              onClick={() => navigate("/")}
              className="w-fit pl-2 text-3xl text-primary-text-1"
              whileHover={{}}
            >
              eurozon
              <span className="text-accent-2">.de</span>
            </MotionButton>
          </TooltipTrigger>
          <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
            <p>Homepage</p>
          </TooltipContent>
        </Tooltip>

        <div className="col-span-1 col-start-3 flex w-full items-center justify-end gap-3 pr-2">
          <Tooltip>
            <TooltipTrigger asChild className="w-fit">
              <MotionButton onClick={toggleDarkMode}>
                {darkMode ? <Sun /> : <Moon />}
              </MotionButton>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
              <p>
                {darkMode
                  ? "zu hellem Desing wechseln"
                  : "zu dunklem Desing wechseln"}
              </p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <TooltipTrigger className="flex h-full w-full items-center justify-center">
                  <MotionButton>
                    <User className="h-7 w-7" />
                  </MotionButton>
                </TooltipTrigger>
                <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
                  <p>User</p>
                </TooltipContent>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 bg-primary-bg-2 text-primary-text-2 shadow-lg">
                {user ? (
                  <>
                    <DropdownMenuLabel className="border-b-[1px]">
                      {user.name + " " + user.surname}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/user/data");
                      }}
                    >
                      Persönliche Daten
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/orders");
                      }}
                    >
                      Bestellhistorie
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500" onClick={logout}>
                      Abmelden
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Anmelden
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Registrieren
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild className="w-fit">
              <MotionButton
                onClick={() => navigate("/shopping-cart")}
                className="relative"
              >
                {Array.isArray(shoppingCartPositionsQuery.data) && (
                  <p className="absolute -right-2 bottom-3.5 rounded-full bg-primary-text-3 px-1 text-sm text-primary-bg-3">
                    {shoppingCartPositionsQuery.data.length}
                  </p>
                )}
                <ShoppingCart className="h-7 w-7" />
              </MotionButton>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
              <p>Shoppingcart</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center md:hidden">
          <div className="relative h-8 w-8">
            <AnimatePresence>
              <Tooltip>
                <TooltipTrigger asChild className="absolute left-0 top-0">
                  <MotionButton
                    key={`burger-menu-icon-${showMenu}`}
                    onClick={() => setShowMenu((prev) => !prev)}
                    initial={
                      isFirstLoad
                        ? false
                        : {
                            opacity: 0,
                            rotate: showMenu ? "-90deg" : "90deg",
                          }
                    }
                    exit={{
                      opacity: 0,
                      rotate: showMenu ? "-90deg" : "90deg",
                    }}
                    animate={{ opacity: 1, rotate: "0deg" }}
                    transition={{ type: "linear" }}
                  >
                    {showMenu ? (
                      <X className="h-8 w-8" />
                    ) : (
                      <Menu className="h-8 w-8" />
                    )}
                  </MotionButton>
                </TooltipTrigger>
                <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
                  <p>{showMenu ? "Close" : "Categories"} </p>
                </TooltipContent>
              </Tooltip>
            </AnimatePresence>
          </div>
          <p className="text-xs text-primary-text-1">Categories</p>
        </div>
        <NavBarSearchBar />
      </div>
      <div className="relative -z-10 md:hidden">
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key={`burger-menu-${showMenu}`}
              className="absolute flex w-full flex-col items-start gap-1 border-b-2 border-primary-bg-3 bg-primary-bg-2 p-2 text-primary-text-2 shadow-xl"
              initial={{ opacity: 0, top: "-100px" }}
              exit={{ opacity: 0, top: "-100px" }}
              animate={{ opacity: 1, top: "0" }}
              transition={{ type: "linear" }}
            >
              <NavBarCategories />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;
