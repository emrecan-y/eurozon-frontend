import ProductGridView from "./ProductGridView";
import { getProducts } from "@/api/api";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";

function ProductGrid() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [category, setCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setCategory(queryParams.get("category") ?? undefined);
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
      {category && <p>Kategorie: {category}</p>}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {productListQuery.data.map(() => (
          <ProductGridView></ProductGridView>
        ))}
      </div>
    </>
  );
}

export default ProductGrid;
