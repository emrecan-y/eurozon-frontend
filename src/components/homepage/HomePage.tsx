import { getProducts, getTopProducts } from "@/api/api";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePageCarousel from "./HomePageCarousel";

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
      size: 10,
      page: 1,
      cancelToken: source.token,
    }).then((e) => {
      setTechnikList(e?.products);
    });
    getProducts({
      category: "sport",
      searchString: "",
      size: 10,
      page: 1,
      cancelToken: source.token,
    }).then((e) => {
      setSportList(e?.products);
    });
    getProducts({
      category: "lebensmittel",
      searchString: "",
      size: 10,
      page: 1,
      cancelToken: source.token,
    }).then((e) => {
      setLebensmittelList(e?.products);
    });
    getTopProducts().then((e) => {
      setTopList(e!);
    });
  }, []);

  return (
    <div className="flex max-w-full flex-1 flex-col gap-8 px-2 py-4 md:p-8">
      <HomePageCarousel products={topList} title="Unsere Topseller" />
      <HomePageCarousel products={technikList} title="Technik" />
      <HomePageCarousel products={sportList} title="Sport" />
      <HomePageCarousel products={lebensmittelList} title="Lebensmittel" />
    </div>
  );
}

export default HomePage;
