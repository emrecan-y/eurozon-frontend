import { useLocation, useNavigate } from "react-router-dom";
import SvgLoader from "../SvgLoader";
import MotionButton from "../ui/MotionButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mainCategories } from "@/models/category";

function NavBarSearchBar() {
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });

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
      className="col-span-2 flex w-full rounded-full border-2 border-primary-text px-2 py-0.5 md:col-span-1 md:col-start-2 md:row-start-1"
    >
      <div className="hidden sm:flex">
        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger className="w-fit border-0 outline-none">
            <SelectValue placeholder="Alle Kategorien" />
          </SelectTrigger>
          <SelectContent className="bg-primary-bg">
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
              {Array.isArray(query.data) &&
                query.data.map((cat) => (
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
        className="h-full w-full bg-primary-bg p-0 text-xs outline-none"
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
              <SvgLoader svg="x" className="h-7 w-7 stroke-primary-text" />
            </MotionButton>
          </TooltipTrigger>
          <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
            <p>Delete Entry</p>
          </TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild className="w-fit">
          <MotionButton type="submit">
            <SvgLoader
              svg="search"
              className="h-7 w-7 stroke-primary-text p-0.5"
            />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
          <p>Search</p>
        </TooltipContent>
      </Tooltip>
    </form>
  );
}

export default NavBarSearchBar;
