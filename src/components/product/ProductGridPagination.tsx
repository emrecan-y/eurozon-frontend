import { ProductQueryType } from "@/models/product";
import MotionButton from "../ui/MotionButton";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
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
    <div className="grid h-fit w-fit grid-cols-7 items-center p-4 text-xl">
      <MotionButton
        disableButton={isFirstPage}
        onClick={() => {
          changePage(currentPageNumber - 1);
        }}
        className="col-start-1 text-center"
      >
        <ChevronLeft />
      </MotionButton>

      {!isFirstPage && (
        <MotionButton
          onClick={() => {
            changePage(1);
          }}
          className="col-start-2 text-center"
        >
          1
        </MotionButton>
      )}
      {currentPageNumber > 2 && <Ellipsis className="col-start-3" />}

      <p className="col-start-4 text-center text-accent-1">
        {currentPageNumber}{" "}
      </p>

      {currentPageNumber + 1 < maxPageNumber && (
        <Ellipsis className="col-start-5" />
      )}

      {!isLastPage && (
        <MotionButton
          className="col-start-6 text-center"
          onClick={() => {
            changePage(maxPageNumber);
          }}
        >
          {maxPageNumber}
        </MotionButton>
      )}

      <MotionButton
        className="col-start-7 text-center"
        disableButton={isLastPage}
        onClick={() => {
          changePage(currentPageNumber + 1);
        }}
      >
        <ChevronRight />
      </MotionButton>
    </div>
  );
}

export default ProductGridPagination;
