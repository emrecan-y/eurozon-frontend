import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";
import SvgLoader from "@/components/SvgLoader";
import MotionButton from "./ui/MotionButton";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return (
    <div className="fixed top-0 z-20 h-fit w-screen text-white">
      <div className="grid grid-cols-3 gap-1 bg-gray-500 pb-1">
        <p className="flex items-center pl-2 text-3xl">eurozon.de</p>
        <div className="col-span-2 flex w-full items-center justify-end gap-3 pr-2">
          <MotionButton>
            <SvgLoader svg="user" className="h-7 w-7 fill-white" />
          </MotionButton>

          <MotionButton>
            <SvgLoader svg="shopping-cart" className="h-8 w-8 fill-white" />
          </MotionButton>
        </div>
        <div className="flex items-center">
          <div className="relative h-8 w-8">
            <AnimatePresence>
              <MotionButton
                key={`burger-menu-icon-${showMenu}`}
                className="absolute top-0 left-0"
                onClick={() => setShowMenu((prev) => !prev)}
                initial={
                  isFirstLoad
                    ? false
                    : { opacity: 0, rotate: showMenu ? "-90deg" : "90deg" }
                }
                exit={{ opacity: 0, rotate: showMenu ? "-90deg" : "90deg" }}
                animate={{ opacity: 1, rotate: "0deg" }}
                transition={{ type: "linear" }}
              >
                <SvgLoader
                  svg={showMenu ? "x" : "burger-menu"}
                  className="h-full w-full fill-white stroke-white"
                />
              </MotionButton>
            </AnimatePresence>
          </div>
          <p className="text-xs">Categories</p>
        </div>
        <div className="col-span-2 flex w-full rounded-full border-2 px-2 py-0.5">
          <input
            className="h-full w-full p-0 text-xs outline-0"
            type="text"
            placeholder="Search.."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText !== "" && (
            <MotionButton
              onClick={() => setSearchText("")}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "linear" }}
            >
              <SvgLoader svg="x" className="h-7 w-7 stroke-white" />
            </MotionButton>
          )}

          <MotionButton>
            <SvgLoader svg="search" className="h-7 w-7 stroke-white p-0.5" />
          </MotionButton>
        </div>
      </div>
      <div className="relative -z-10">
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key={`burger-menu-${showMenu}`}
              className="absolute w-full bg-amber-600 text-black"
              initial={{ opacity: 0, top: "-100px" }}
              exit={{ opacity: 0, top: "-100px" }}
              animate={{ opacity: 1, top: "0" }}
              transition={{ type: "linear" }}
            >
              <p>Category1</p>
              <p>Category2</p>
              <p>Category3</p>
              <p>Category4</p>
              <p>Category5</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;
