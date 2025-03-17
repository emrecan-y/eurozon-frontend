import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";
import MotionButton from "../ui/MotionButton";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import NavBarCategories from "./NavBarCategories";
import NavBarSearchBar from "./NavBarSearchBar";
import { Menu, ShoppingCart, User, X } from "lucide-react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  const location = useLocation();
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <TooltipProvider>
      <div className="text-accent-2 shadow-xs sticky top-0 z-20 h-fit w-screen">
        <div className="bg-primary-bg-2 grid grid-cols-3 gap-1 p-1 md:p-3">
          <Tooltip>
            <TooltipTrigger asChild className="w-fit">
              <MotionButton
                onClick={() => navigate("/")}
                className="text-primary-text-1 w-fit pl-2 text-3xl"
                whileHover={{}}
              >
                eurozon
                <span className="text-accent-2">.de</span>
              </MotionButton>
            </TooltipTrigger>
            <TooltipContent className="bg-primary-bg-3 text-primary-text-3 rounded-lg p-1 text-xs">
              <p>Homepage</p>
            </TooltipContent>
          </Tooltip>

          <div className="col-span-1 col-start-3 flex w-full items-center justify-end gap-3 pr-2">
            <Tooltip>
              <TooltipTrigger asChild className="w-fit">
                <MotionButton onClick={() => navigate("/login")}>
                  <User className="h-7 w-7" />
                </MotionButton>
              </TooltipTrigger>
              <TooltipContent className="bg-primary-bg-3 text-primary-text-3 rounded-lg p-1 text-xs">
                <p>User</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild className="w-fit">
                <MotionButton>
                  <ShoppingCart className="h-7 w-7" />
                </MotionButton>
              </TooltipTrigger>
              <TooltipContent className="bg-primary-bg-3 text-primary-text-3 rounded-lg p-1 text-xs">
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
                  <TooltipContent className="bg-primary-bg-3 text-primary-text-3 rounded-lg p-1 text-xs">
                    <p>{showMenu ? "Close" : "Categories"} </p>
                  </TooltipContent>
                </Tooltip>
              </AnimatePresence>
            </div>
            <p className="text-primary-text-1 text-xs">Categories</p>
          </div>
          <NavBarSearchBar />
        </div>
        <div className="relative -z-10 md:hidden">
          <AnimatePresence>
            {showMenu && (
              <motion.div
                key={`burger-menu-${showMenu}`}
                className="bg-primary-bg-2 text-primary-text-2 absolute flex w-full flex-col items-start gap-1 p-2"
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
    </TooltipProvider>
  );
}

export default Navbar;
