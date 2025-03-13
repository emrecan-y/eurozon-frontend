import { mainCategories } from "@/models/category";
import NavBarCategoryButton from "./NavBarCategoryButton";

function NavBarCategories() {
  return (
    <>
      {mainCategories.map((c) => (
        <NavBarCategoryButton
          key={"nav-button-" + c.toLowerCase()}
          category={c}
        />
      ))}
    </>
  );
}

export default NavBarCategories;
