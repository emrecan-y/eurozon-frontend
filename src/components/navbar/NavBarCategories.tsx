import NavBarCategoryButton from "./NavBarCategoryButton";
import { useQuery } from "@tanstack/react-query";
import { getMainCategories } from "@/api/api";

function NavBarCategories() {
  const query = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });
  return (
    <>
      {query.data &&
        query.data.map((c) => (
          <NavBarCategoryButton
            key={"nav-button-" + c.name.toLowerCase()}
            category={c.name}
          />
        ))}
    </>
  );
}

export default NavBarCategories;
