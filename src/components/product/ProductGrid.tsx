import ProductGridElement from "./ProductGridElement";
import { getProducts } from "@/api/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PaginatedProductList, ProductQueryType } from "@/models/product";

import ProductGridPagination from "./ProductGridPagination";
import axios from "axios";

function ProductGrid() {
  const preferredPageSize = 12;
  const location = useLocation();
  const [paginatedProductList, setPaginatedProductList] =
    useState<PaginatedProductList>();

  const [error, setError] = useState(false);
  const [query, setQuery] = useState<ProductQueryType>({
    page: 1,
    size: preferredPageSize,
    category: "",
    searchString: "",
  });
  const { searchString, category } = query;

  useEffect(() => {
    setError(false);
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") ?? undefined;
    const searchString = queryParams.get("searchString") ?? undefined;
    const page = queryParams.get("page") ?? undefined;
    const size = queryParams.get("size") ?? undefined;
    setQuery({
      searchString: searchString ?? "",
      category: category ?? "",
      size: (size && Number.parseInt(size)) || preferredPageSize,
      page: (page && Number.parseInt(page)) || 1,
    });
  }, [location.search]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    getProducts({
      category: query.category,
      searchString: query.searchString,
      size: query.size,
      page: query.page,
      cancelToken: source.token,
    })
      .then((e) => {
        setPaginatedProductList(e || undefined);
      })
      .catch(() => {
        setPaginatedProductList(undefined);
        setError(true);
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [query]);

  const emptyArr = Array(preferredPageSize).fill(undefined);

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="ml-5 mt-5">
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
        {error ? (
          <p className="flex-1 p-5">Keine Produkte gefunden.</p>
        ) : (
          <div className="flex-1">
            <div className="grid grid-cols-1 grid-rows-subgrid gap-4 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!Array.isArray(paginatedProductList?.products)
                ? emptyArr.map((e, index) => (
                    <ProductGridElement
                      key={`product-skeleton-${index}`}
                    ></ProductGridElement>
                  ))
                : paginatedProductList.products.map((p) => (
                    <ProductGridElement
                      product={p}
                      key={p.id}
                    ></ProductGridElement>
                  ))}
            </div>
          </div>
        )}
        <div className="self-center">
          <ProductGridPagination
            query={query}
            currentPageNumber={paginatedProductList?.currentPageNumber || 1}
            maxPageNumber={paginatedProductList?.maxPageNumber || 1}
          ></ProductGridPagination>
        </div>
      </div>
    </>
  );
}

export default ProductGrid;
