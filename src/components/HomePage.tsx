import { getProducts, getTopProducts } from "@/api/api";
import { Product } from "@/models/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function HomePage() {
  const [topList, setTopList] = useState<Product[]>();
  const [technikList, setTechnikList] = useState<Product[]>();
  const [sportList, setSportList] = useState<Product[]>();
  const [lebensmittelList, setLebensmittelList] = useState<Product[]>();

  useEffect(() => {
    getProducts({
      category: "technik",
      searchString: "",
      size: 12,
      page: 1,
    }).then((e) => {
      setTechnikList(e?.products);
    });
    getProducts({
      category: "sport",
      searchString: "",
      size: 12,
      page: 1,
    }).then((e) => {
      setSportList(e?.products);
    });
    getProducts({
      category: "",
      searchString: "",
      size: 12,
      page: 1,
    }).then((e) => {
      setLebensmittelList(e?.products);
    });
    getTopProducts().then((e) => {
      setTopList(e!);
    });
  }, []);


  const ProductCarousel = ({ products, title }: { products?: Product[]; title: string }) => (
    <div className="w-72 lg:w-full lg:max-w-7xl lg:py-2">
      <h2 className="mb-4 text-lg lg:text-2xl font-bold">{title}</h2>
      {products && products.length > 0 ? (
        <Carousel 
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-2/4 md:basis-2/5 lg:basis-1/5">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>Keine Produkte verfügbar</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ProductCarousel products={topList} title="Top Produkte" />
      <ProductCarousel products={technikList} title="Technik" />
      <ProductCarousel products={sportList} title="Sport" />
      <ProductCarousel products={lebensmittelList} title="Lebensmittel" />
    </div>
  );
}

export default HomePage;