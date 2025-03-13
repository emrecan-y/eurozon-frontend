import NavBarCategoryButton from "./NavBarCategoryButton";

function NavBarCategories() {
  const categories = ["Technik", "Kleidung", "Lebensmittel", "Sport", "Haus"];

  return (
    <>
      {categories.map((c) => (
        <NavBarCategoryButton category={c} />
      ))}
    </>
  );
}

export default NavBarCategories;
