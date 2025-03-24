import { useLocation } from "react-router-dom";
import { useMainCategoriesQuery } from "../../queries/useMainCategoriesQuery";
import NavBarCategoryButton from "./NavBarCategoryButton";

function NavBarCategories() {
  const mainCategoriesQuery = useMainCategoriesQuery();
  const location = useLocation();

  return (
    <>
      {mainCategoriesQuery &&
        Array.isArray(mainCategoriesQuery.data) &&
        mainCategoriesQuery.data.map((category) => (
          <>
            <NavBarCategoryButton
              key={`nav-button-${category.name.toLowerCase()}-${location.pathname}`}
              category={category}
            />
          </>
        ))}
    </>
  );
}

export default NavBarCategories;
