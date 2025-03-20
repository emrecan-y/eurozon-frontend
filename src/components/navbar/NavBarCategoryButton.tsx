import { useLocation, useNavigate } from "react-router-dom";
import MotionButton from "../ui/MotionButton";
import { useEffect, useState } from "react";
import { Category } from "@/models/category";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type NavBarCategoryButtonProps = {
  category: Category;
};
function NavBarCategoryButton({ category }: NavBarCategoryButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const hasChildren =
    Array.isArray(category.children) && category.children.length > 0;

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  function childrenContainsCurrentCategory(
    children: Category[],
    activeCategoryName: string,
  ): boolean {
    if (children.find((category) => category.name === activeCategoryName)) {
      return true;
    } else {
      return (
        Array.isArray(children) &&
        children
          .map((child) =>
            childrenContainsCurrentCategory(child.children, activeCategoryName),
          )
          .includes(true)
      );
    }
  }

  useEffect(() => {
    if (location.pathname === "/products") {
      const activeCategoryName = new URLSearchParams(location.search).get(
        "category",
      );
      if (activeCategoryName === category.name) {
        setIsCategoryActive(true);
      } else {
        setIsCategoryActive(false);
      }
      if (
        hasChildren &&
        activeCategoryName &&
        childrenContainsCurrentCategory(category.children, activeCategoryName)
      ) {
        setShowChildren(true);
      }
    }
  }, [location]);

  return (
    <>
      <div className="flex">
        <MotionButton
          className={isCategoryActive ? "text-accent-2" : undefined}
          onClick={() =>
            navigate(
              "/products?" + new URLSearchParams([["category", category.name]]),
            )
          }
        >
          {category.name}
        </MotionButton>
        <AnimatePresence>
          <div className="relative h-7 w-7">
            {hasChildren && (
              <MotionButton
                className="absolute left-0 top-0 h-full w-full"
                key={`nav-button-${category.name.toLowerCase()}-${showChildren}`}
                onClick={() => setShowChildren((prev) => !prev)}
                initial={
                  isFirstLoad
                    ? false
                    : {
                        opacity: 0,
                        rotate: showChildren ? "-90deg" : "90deg",
                      }
                }
                exit={{
                  opacity: 0,
                  rotate: showChildren ? "-90deg" : "90deg",
                }}
                animate={{ opacity: 1, rotate: "0deg" }}
                transition={{ type: "linear" }}
              >
                {showChildren ? (
                  <ChevronUp className="h-full w-full" />
                ) : (
                  <ChevronDown className="h-full w-full" />
                )}
              </MotionButton>
            )}
          </div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {hasChildren && showChildren && (
          <motion.div
            className="ml-3 border-l border-primary-text-2 pl-1"
            initial={{
              opacity: 0,
              height: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "linear" }}
          >
            {category.children.map((childCategory) => (
              <NavBarCategoryButton
                key={`nav-button-${childCategory.name.toLowerCase()}`}
                category={childCategory}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBarCategoryButton;
