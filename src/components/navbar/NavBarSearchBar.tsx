import { useLocation, useNavigate } from "react-router-dom";
import MotionButton from "../ui/MotionButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CheckIcon, Search, X } from "lucide-react";
import { useMainCategoriesQuery } from "../../queries/useMainCategoriesQuery";

function NavBarSearchBar() {
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const mainCategoriesQuery = useMainCategoriesQuery();

  function searchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchText !== "") {
      let searchParams = new URLSearchParams([["searchString", searchText]]);
      if (category !== "") {
        searchParams.append("category", category);
      }
      navigate("/products?" + searchParams.toString());
    }
  }

  const location = useLocation();

  useEffect(() => {
    setSearchText("");
    if (location.pathname === "/products") {
      const categorySearch = new URLSearchParams(location.search).get(
        "category",
      );
      if (categorySearch !== null) {
        setCategory(categorySearch);
      }
    }
  }, [location]);

  return (
    <form
      onSubmit={(e) => searchSubmit(e)}
      className="col-span-2 flex w-full rounded-full border-2 border-primary-bg-1 bg-primary-bg-1 px-2 py-0.5 text-primary-text-1 shadow-md md:col-span-1 md:col-start-2 md:row-start-1"
    >
      <div className="flex items-center justify-center">
        <Select
          onValueChange={(val) => {
            val = val === "all" ? "" : val;
            setCategory(val);
          }}
          value={category}
        >
          <SelectTrigger className="w-fit border-0 text-xs outline-none sm:text-sm">
            <SelectValue placeholder="Alle Kategorien" />
          </SelectTrigger>
          <SelectContent className="primary-bg-3 border-2 bg-primary-bg-2 text-primary-text-2 shadow-lg">
            <SelectGroup>
              <SelectItem
                key={`search-bar-category-all`}
                value="all"
                className="font-bold hover:cursor-pointer [&_svg]:flex"
              >
                {category === "" && (
                  <span className="absolute right-2 top-2.5 flex size-3.5 items-center justify-center">
                    <CheckIcon className="size-4" />
                  </span>
                )}
                Alle Kategorien
              </SelectItem>
              {mainCategoriesQuery &&
                Array.isArray(mainCategoriesQuery.data) &&
                mainCategoriesQuery.data.map((cat) => (
                  <SelectItem
                    key={`search-bar-category-${cat.name.toLowerCase()}`}
                    value={cat.name}
                    className="hover:cursor-pointer"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <input
        className="h-full w-full bg-primary-bg-1 p-0 px-1 text-xs outline-none focus:outline-none md:text-sm"
        type="text"
        placeholder="Search.."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText !== "" && (
        <Tooltip>
          <TooltipTrigger asChild className="w-fit">
            <MotionButton
              onClick={() => setSearchText("")}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "linear" }}
            >
              <X className="h-7 w-7 stroke-accent-1" />
            </MotionButton>
          </TooltipTrigger>
          <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
            <p>Delete Entry</p>
          </TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild className="w-fit">
          <MotionButton type="submit">
            <Search className="h-7 w-7 stroke-accent-1 p-0.5" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
          <p>Search</p>
        </TooltipContent>
      </Tooltip>
    </form>
  );
}

export default NavBarSearchBar;
