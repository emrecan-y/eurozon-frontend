import { useMainCategoriesQuery } from "../queries/useMainCategoriesQuery";
import NavBarCategoryButton from "./NavBarCategoryButton";

function NavBarCategories() {
  const mainCategoriesQuery = useMainCategoriesQuery();

  return (
    <>
      {mainCategoriesQuery &&
        Array.isArray(mainCategoriesQuery.data) &&
        mainCategoriesQuery.data.map((category) => (
          <>
            <NavBarCategoryButton
              key={"nav-button-" + category.name.toLowerCase()}
              category={category}
            />
          </>
        ))}
    </>
  );
}

export default NavBarCategories;
