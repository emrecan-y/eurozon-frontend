import NavBarCategoryButton from "./NavBarCategoryButton";

function NavBarCategories() {
  const categories = ["Technik", "Kleidung", "Lebensmittel", "Sport", "Haus"];

  return (
    <>
      {categories.map((c) => (
        <NavBarCategoryButton
          key={"nav-button-" + c.toLowerCase()}
          category={c}
        />
      ))}
    </>
  );
}

export default NavBarCategories;
