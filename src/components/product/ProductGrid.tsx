import ProductGridElement from "./ProductGridElement";
import { getProducts } from "@/api/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PaginatedProductList, ProductQueryType } from "@/models/product";

import ProductGridPagination from "./ProductGridPagination";

function ProductGrid() {
  const location = useLocation();
  const [paginatedProductList, setPaginatedProductList] =
    useState<PaginatedProductList>();

  const [query, setQuery] = useState<ProductQueryType>({
    page: 1,
    size: 12,
    category: "",
    searchString: "",
  });
  const { searchString, category } = query;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") ?? undefined;
    const searchString = queryParams.get("searchString") ?? undefined;
    const page = queryParams.get("page") ?? undefined;
    const size = queryParams.get("size") ?? undefined;
    setQuery({
      searchString: searchString ?? "",
      category: category ?? "",
      size: (size && Number.parseInt(size)) || 12,
      page: (page && Number.parseInt(page)) || 1,
    });
  }, [location.search]);

  useEffect(() => {
    getProducts({
      category: query.category,
      searchString: query.searchString,
      size: query.size,
      page: query.page,
    }).then((e) => {
      setPaginatedProductList(e || undefined);
    });
  }, [query]);

  const emptyArr = Array(20).fill(undefined);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        {!Array.isArray(paginatedProductList?.products)
          ? emptyArr.map((e, index) => (
              <ProductGridElement
                key={`product-skeleton-${index}`}
              ></ProductGridElement>
            ))
          : paginatedProductList.products.map((p) => (
              <ProductGridElement product={p} key={p.id}></ProductGridElement>
            ))}
      </div>
      <ProductGridPagination
        query={query}
        currentPageNumber={paginatedProductList?.currentPageNumber || 1}
        maxPageNumber={paginatedProductList?.maxPageNumber || 1}
      ></ProductGridPagination>
    </>
  );
}

export default ProductGrid;
