import { useMainCategoriesQuery } from "../queries/useMainCategoriesQuery";
import NavBarCategoryButton from "./NavBarCategoryButton";

function NavBarCategories() {
  const mainCategoriesQuery = useMainCategoriesQuery();
  return (
    <>
      {mainCategoriesQuery &&
        Array.isArray(mainCategoriesQuery.data) &&
        mainCategoriesQuery.data.map((c) => (
          <NavBarCategoryButton
            key={"nav-button-" + c.name.toLowerCase()}
            category={c.name}
          />
        ))}
    </>
  );
}

export default NavBarCategories;
