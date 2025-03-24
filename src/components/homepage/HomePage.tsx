import { getProducts, getTopProducts } from "@/api/api";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HomePageProductCard from "./HomePageProductCard";
import axios from "axios";

function HomePage() {
  const [topList, setTopList] = useState<Product[]>();
  const [technikList, setTechnikList] = useState<Product[]>();
  const [sportList, setSportList] = useState<Product[]>();
  const [lebensmittelList, setLebensmittelList] = useState<Product[]>();

  useEffect(() => {
    const source = axios.CancelToken.source();
    getProducts({
      category: "technik",
      searchString: "",
      size: 12,
      page: 1,
      cancelToken: source.token,
    }).then((e) => {
      setTechnikList(e?.products);
    });
    getProducts({
      category: "sport",
      searchString: "",
      size: 12,
      page: 1,
      cancelToken: source.token,
    }).then((e) => {
      setSportList(e?.products);
    });
    getProducts({
      category: "lebensmittel",
      searchString: "",
      size: 12,
      page: 1,
      cancelToken: source.token,
    }).then((e) => {
      setLebensmittelList(e?.products);
    });
    getTopProducts().then((e) => {
      setTopList(e!);
    });
  }, []);

  const ProductCarousel = ({
    products,
    title,
  }: {
    products?: Product[];
    title: string;
  }) => (
    <div className="w-full max-w-72 md:max-w-2xl lg:max-w-7xl lg:py-2">
      <h2 className="mb-4 text-lg font-bold lg:text-2xl">{title}</h2>
      {products && products.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-2/4 md:basis-2/6 lg:basis-1/5"
              >
                <HomePageProductCard product={product} />
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
      <ProductCarousel products={topList} title="Unsere Topseller" />
      <ProductCarousel products={technikList} title="Technik" />
      <ProductCarousel products={sportList} title="Sport" />
      <ProductCarousel products={lebensmittelList} title="Lebensmittel" />
    </div>
  );
}

export default HomePage;
