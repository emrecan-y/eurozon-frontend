import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";
import SvgLoader from "@/components/SvgLoader";
import MotionButton from "./ui/MotionButton";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return (
    <div className="text-primary-text sticky top-0 z-20 h-fit w-screen">
      <div className="bg-primary-bg grid grid-cols-3 gap-1 pb-1">
        <p className="flex items-center pl-2 text-3xl">eurozon.de</p>
        <div className="col-span-2 flex w-full items-center justify-end gap-3 pr-2">
          <MotionButton onClick={() => navigate("/login")}>
            <SvgLoader svg="user" className="fill-primary-text h-7 w-7" />
          </MotionButton>

          <MotionButton>
            <SvgLoader
              svg="shopping-cart"
              className="fill-primary-text h-8 w-8"
            />
          </MotionButton>
        </div>
        <div className="flex items-center">
          <div className="relative h-8 w-8">
            <AnimatePresence>
              <MotionButton
                key={`burger-menu-icon-${showMenu}`}
                className="absolute left-0 top-0"
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
                  className="fill-primary-text stroke-primary-text h-full w-full"
                />
              </MotionButton>
            </AnimatePresence>
          </div>
          <p className="text-xs">Categories</p>
        </div>
        <div className="border-primary-text col-span-2 flex w-full rounded-full border-2 px-2 py-0.5">
          <input
            className="bg-primary-bg h-full w-full p-0 text-xs outline-none"
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
              <SvgLoader svg="x" className="stroke-primary-text h-7 w-7" />
            </MotionButton>
          )}

          <MotionButton>
            <SvgLoader
              svg="search"
              className="stroke-primary-text h-7 w-7 p-0.5"
            />
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
