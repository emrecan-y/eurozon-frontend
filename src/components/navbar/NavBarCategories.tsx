import NavBarCategoryButton from "./NavBarCategoryButton";
import { QueryContext } from "../context/QueryContext";
import { useContext } from "react";

function NavBarCategories() {
  const { mainCategoriesQuery } = useContext(QueryContext);
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
