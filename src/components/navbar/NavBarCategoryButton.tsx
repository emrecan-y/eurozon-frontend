import { useLocation, useNavigate } from "react-router-dom";
import MotionButton from "../ui/MotionButton";
import { useEffect, useState } from "react";

type NavBarCategoryButtonProps = {
  category: string;
};
function NavBarCategoryButton({ category }: NavBarCategoryButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCategoryActive, setIsCategoryActive] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/products" &&
      new URLSearchParams(location.search).get("category") === category
    ) {
      setIsCategoryActive(true);
    } else {
      setIsCategoryActive(false);
    }
  }, [location]);

  return (
    <MotionButton
      className={isCategoryActive ? "text-accent-2" : undefined}
      onClick={() =>
        navigate("/products?" + new URLSearchParams([["category", category]]))
      }
    >
      {category}
    </MotionButton>
  );
}

export default NavBarCategoryButton;
