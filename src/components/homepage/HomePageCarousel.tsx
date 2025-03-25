import { Product } from "@/models/product";
import ProductGridElement from "../product/ProductGridElement";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MotionButton from "../ui/MotionButton";

type HomePageCarouselProps = {
  products?: Product[];
  title: string;
};

function HomePageCarousel({ products, title }: HomePageCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const style = window.getComputedStyle(carouselRef.current as HTMLElement);
      const paddingLeft = parseInt(style.paddingLeft);
      carouselRef.current.scrollLeft = paddingLeft;
    }
  });

  function scroll(direction: "left" | "right") {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0]?.clientWidth;
      const style = window.getComputedStyle(carouselRef.current as HTMLElement);
      const gap = parseInt(style.gap);
      if (direction === "left") {
        carouselRef.current.scrollLeft -= itemWidth + gap;
      } else if (direction === "right") {
        carouselRef.current.scrollLeft += itemWidth + gap;
      }
    }
  }

  return (
    <div className="relative max-w-full">
      <h2 className="pb-2 text-lg font-bold lg:text-2xl">{title}</h2>
      <div className="flex items-center">
        <MotionButton
          onClick={() => scroll("left")}
          className="absolute left-2 flex h-7 w-7 items-center justify-center rounded border border-primary-bg-3 bg-primary-text-3 text-primary-bg-3 shadow-lg md:h-9 md:w-9"
        >
          <ArrowLeft />
        </MotionButton>
        <MotionButton
          onClick={() => scroll("right")}
          className="absolute right-2 flex h-7 w-7 items-center justify-center rounded border border-primary-bg-3 bg-primary-text-3 text-primary-bg-3 shadow-lg md:h-9 md:w-9"
        >
          <ArrowRight />
        </MotionButton>
        <div
          ref={carouselRef}
          className="grid grid-flow-col gap-3 overflow-x-auto scroll-smooth px-24 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products && products.length > 0 ? (
            products.map((p) => (
              <ProductGridElement
                product={p}
                key={p.id}
                className="w-56 text-sm md:w-64 md:text-base"
              />
            ))
          ) : (
            <p>Keine Produkte verfügbar</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePageCarousel;
