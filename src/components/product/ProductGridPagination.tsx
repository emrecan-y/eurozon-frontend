import { ProductQueryType } from "@/models/product";
import MotionButton from "../ui/MotionButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductGridPaginationProps = {
  currentPageNumber: number;
  maxPageNumber: number;
  query: ProductQueryType;
};

function ProductGridPagination({
  query,
  maxPageNumber,
  currentPageNumber,
}: ProductGridPaginationProps) {
  const navigate = useNavigate();

  const isFirstPage = currentPageNumber === 1;
  const isLastPage = currentPageNumber === maxPageNumber;

  function changePage(pageNumber: number) {
    navigate(
      "/products?" +
        new URLSearchParams({
          size: query.size.toString(),
          page: pageNumber.toString(),
          category: query.category,
          searchString: query.searchString,
        }).toString(),
    );
  }

  return (
    <div className="flex w-full items-center justify-center gap-2 p-4 text-xl">
      <MotionButton
        disableButton={isFirstPage}
        onClick={() => {
          changePage(currentPageNumber - 1);
        }}
      >
        <ArrowLeft />
      </MotionButton>

      {!isFirstPage && (
        <MotionButton
          onClick={() => {
            changePage(1);
          }}
        >
          1
        </MotionButton>
      )}
      {currentPageNumber > 2 && <p>...</p>}

      <p className="text-accent-1">{currentPageNumber} </p>

      {currentPageNumber + 1 < maxPageNumber && <p>...</p>}

      {!isLastPage && (
        <MotionButton
          onClick={() => {
            changePage(maxPageNumber);
          }}
        >
          {maxPageNumber}
        </MotionButton>
      )}

      <MotionButton
        disableButton={isLastPage}
        onClick={() => {
          changePage(currentPageNumber + 1);
        }}
      >
        <ArrowRight />
      </MotionButton>
    </div>
  );
}

export default ProductGridPagination;
