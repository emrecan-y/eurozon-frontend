import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";
import SvgLoader from "@/components/SvgLoader";
import MotionButton from "../ui/MotionButton";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import NavBarCategories from "./NavBarCategories";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  function searchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(
      "/products?" + new URLSearchParams([["searchString", searchText]]),
    );
  }

  return (
    <TooltipProvider>
      <div className="sticky top-0 z-20 h-fit w-screen text-primary-text">
        <div className="grid grid-cols-3 gap-1 bg-primary-bg p-0.5 md:p-3">
          <Tooltip>
            <TooltipTrigger asChild className="w-fit">
              <MotionButton
                onClick={() => navigate("/")}
                className="w-fit pl-2 text-3xl"
                whileHover={{}}
              >
                eurozon.de
              </MotionButton>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
              <p>Homepage</p>
            </TooltipContent>
          </Tooltip>

          <div className="col-span-1 col-start-3 flex w-full items-center justify-end gap-3 pr-2">
            <Tooltip>
              <TooltipTrigger asChild className="w-fit">
                <MotionButton onClick={() => navigate("/login")}>
                  <SvgLoader svg="user" className="h-7 w-7 fill-primary-text" />
                </MotionButton>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
                <p>User</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild className="w-fit">
                <MotionButton>
                  <SvgLoader
                    svg="shopping-cart"
                    className="h-8 w-8 fill-primary-text"
                  />
                </MotionButton>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
                <p>Shoppingcart</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center md:hidden">
            <div className="relative h-8 w-8">
              <AnimatePresence>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="absolute left-0 top-0 w-fit"
                  >
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
                      <SvgLoader
                        svg={showMenu ? "x" : "burger-menu"}
                        className="h-full w-full fill-primary-text stroke-primary-text"
                      />
                    </MotionButton>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
                    <p>{showMenu ? "Close" : "Categories"} </p>
                  </TooltipContent>
                </Tooltip>
              </AnimatePresence>
            </div>
            <p className="text-xs">Categories</p>
          </div>
          <form
            onSubmit={(e) => searchSubmit(e)}
            className="col-span-2 flex w-full rounded-full border-2 border-primary-text px-2 py-0.5 md:col-span-1 md:col-start-2 md:row-start-1"
          >
            <input
              className="h-full w-full bg-primary-bg p-0 text-xs outline-none"
              type="text"
              placeholder="Search.."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText !== "" && (
              <Tooltip>
                <TooltipTrigger asChild className="w-fit">
                  <MotionButton
                    onClick={() => setSearchText("")}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "linear" }}
                  >
                    <SvgLoader
                      svg="x"
                      className="h-7 w-7 stroke-primary-text"
                    />
                  </MotionButton>
                </TooltipTrigger>
                <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
                  <p>Delete Entry</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild className="w-fit">
                <MotionButton type="submit">
                  <SvgLoader
                    svg="search"
                    className="h-7 w-7 stroke-primary-text p-0.5"
                  />
                </MotionButton>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </form>
        </div>
        <div className="relative -z-10 md:hidden">
          <AnimatePresence>
            {showMenu && (
              <motion.div
                key={`burger-menu-${showMenu}`}
                className="absolute flex w-full flex-col items-start gap-1 bg-amber-600 p-2 text-black"
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
