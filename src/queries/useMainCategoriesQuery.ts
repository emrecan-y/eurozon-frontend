import { getMainCategories } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useMainCategoriesQuery() {
  const mainCategoriesQuery = useQuery({
    queryKey: ["mainCategories"],
    queryFn: getMainCategories,
  });
  return mainCategoriesQuery;
}
