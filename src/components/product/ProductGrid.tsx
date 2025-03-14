import { mainCategories } from "@/models/category";
import ProductGridView from "./ProductGridView";
import { getProducts } from "@/api/api";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function ProductGrid() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [searchString, setSearchString] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    if (categoryParam !== null) {
      setCategory(
        mainCategories.find((cat) => cat === categoryParam) || undefined,
      );
    } else {
      setCategory(undefined);
    }

    setSearchString(queryParams.get("searchString") ?? undefined);
  }, [location.search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["productList"],
    queryFn: getProducts,
  });
  const { mutate } = useMutation({
    mutationFn: undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });

  const emptyArr = Array(20).fill(undefined);

  return (
    <>
      <div className="grid h-11 w-full grid-cols-1 gap-2 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <div className="col-span-full">
          <p>
            {searchString && category
              ? `Suche für: ${searchString} in Kategorie: ${category}`
              : category
                ? `Kategorie: ${category}`
                : searchString
                  ? `Suche für: ${searchString}`
                  : ""}
          </p>
        </div>
        {isLoading || isError
          ? emptyArr.map(() => <ProductGridView></ProductGridView>)
          : Array.isArray(data) &&
            data.map((p) => <ProductGridView product={p}></ProductGridView>)}
      </div>
    </>
  );
}

export default ProductGrid;
