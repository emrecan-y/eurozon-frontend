import ProductGridElement from "./ProductGridElement";
import { getProducts } from "@/api/api";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { PaginatedProductList } from "@/models/product";

import ProductGridPagination from "./ProductGridPagination";
import axios from "axios";

function ProductGrid() {
  const preferredPageSize = 12;
  const location = useLocation();
  const [paginatedProductList, setPaginatedProductList] =
    useState<PaginatedProductList>();

  const query = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") ?? "";
    const searchString = queryParams.get("searchString") ?? "";
    const page = queryParams.get("page") ?? "1";
    const size = queryParams.get("size") ?? String(preferredPageSize);

    return {
      searchString,
      category,
      size: Number.parseInt(size),
      page: Number.parseInt(page),
    };
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
        setPaginatedProductList(e);
      })
      .catch(() => {
        setPaginatedProductList(undefined);
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
            {query.searchString && query.category
              ? `Suche für: ${query.searchString} in Kategorie: ${query.category}`
              : query.category
                ? `Kategorie: ${query.category}`
                : query.searchString
                  ? `Suche für: ${query.searchString}`
                  : ""}
          </p>
        </div>
        {paginatedProductList ? (
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
                      showButton
                    ></ProductGridElement>
                  ))}
            </div>
          </div>
        ) : (
          <p className="flex-1 p-5">Keine Produkte gefunden.</p>
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
