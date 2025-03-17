import { useLocation, useNavigate } from "react-router-dom";
import MotionButton from "../ui/MotionButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CheckIcon, Search, X } from "lucide-react";
import { QueryContext } from "../context/QueryContext";

function NavBarSearchBar() {
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { mainCategoriesQuery } = useContext(QueryContext);

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
      className="bg-primary-bg-1 text-primary-text-1 border-primary-bg-1 col-span-2 flex w-full rounded-full border-2 px-2 py-0.5 md:col-span-1 md:col-start-2 md:row-start-1"
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
          <SelectContent className="bg-primary-bg-2 primary-bg-3 text-primary-text-2 border-2 shadow-lg">
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
        className="bg-primary-bg-1 h-full w-full p-0 px-1 text-xs outline-none focus:outline-none md:text-sm"
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
              <X className="stroke-accent-1 h-7 w-7" />
            </MotionButton>
          </TooltipTrigger>
          <TooltipContent className="bg-primary-bg-3 text-primary-text-3 rounded-lg p-1 text-xs">
            <p>Delete Entry</p>
          </TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild className="w-fit">
          <MotionButton type="submit">
            <Search className="stroke-accent-1 h-7 w-7 p-0.5" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent className="bg-primary-bg-3 text-primary-text-3 rounded-lg p-1 text-xs">
          <p>Search</p>
        </TooltipContent>
      </Tooltip>
    </form>
  );
}

export default NavBarSearchBar;
