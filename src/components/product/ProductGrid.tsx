import { mainCategories } from "@/models/category";
import ProductGridView from "./ProductGridView";
import { getProducts } from "@/api/api";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
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

  const productListQuery = useQuery({
    queryKey: ["productList"],
    queryFn: getProducts,
  });
  const { mutate } = useMutation({
    mutationFn: undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });

  if (!productListQuery.data) {
    productListQuery.data = Array(20).fill(undefined);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
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
        {productListQuery.data.map(() => (
          <ProductGridView></ProductGridView>
        ))}
      </div>
    </>
  );
}

export default ProductGrid;
