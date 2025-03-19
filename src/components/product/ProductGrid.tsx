import { mainCategories } from "@/models/category";
import ProductGridElement from "./ProductGridElement";
import { getProducts } from "@/api/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product, ProductQueryType } from "@/models/product";

function ProductGrid() {
  const location = useLocation();
  const [productList, setProductList] = useState<Product[]>();

  const [query, setQuery] = useState<ProductQueryType>({});
  const { size, page, searchString, category } = query;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category =
      mainCategories.find((cat) => cat === queryParams.get("category")) ||
      undefined;
    const searchString = queryParams.get("searchString") ?? undefined;
    setQuery({ searchString: searchString, category: category });
  }, [location.search]);

  useEffect(() => {
    getProducts({
      category: query.category,
      searchString: query.searchString,
    }).then((e) => {
      setProductList(e || undefined);
    });
  }, [query]);

  const emptyArr = Array(20).fill(undefined);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-2 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        {!Array.isArray(productList)
          ? emptyArr.map((e, index) => (
              <ProductGridElement
                key={`product-skeleton-${index}`}
              ></ProductGridElement>
            ))
          : productList.map((p) => (
              <ProductGridElement product={p} key={p.id}></ProductGridElement>
            ))}
      </div>
    </>
  );
}

export default ProductGrid;
