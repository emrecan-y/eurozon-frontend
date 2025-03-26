import { useLocation } from "react-router-dom";
import { useMainCategoriesQuery } from "../../queries/useMainCategoriesQuery";
import NavBarCategoryButton from "./NavBarCategoryButton";
import { useEffect, useRef, useState } from "react";

function NavBarCategories() {
  const mainCategoriesQuery = useMainCategoriesQuery();
  const [lastTimeStamp, setLastTimeStamp] = useState(Date.now());

  const { pathname } = useLocation();
  const lastPathRef = useRef("");

  // only rerender the NavBarCategories when moving out of products
  useEffect(() => {
    if (
      (lastPathRef.current === "/products" && pathname !== "/products") ||
      (pathname !== "/products" && lastPathRef.current !== pathname)
    ) {
      setLastTimeStamp(Date.now());
    }
    lastPathRef.current = pathname;
  }, [pathname]);

  return (
    <>
      {mainCategoriesQuery &&
        Array.isArray(mainCategoriesQuery.data) &&
        mainCategoriesQuery.data.map((category) => (
          <>
            <NavBarCategoryButton
              key={`nav-button-${category.name.toLowerCase()}-${lastTimeStamp}`}
              category={category}
            />
          </>
        ))}
    </>
  );
}

export default NavBarCategories;
