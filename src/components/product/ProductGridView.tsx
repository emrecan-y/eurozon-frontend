import { Product } from "@/models/product";
import { Image } from "lucide-react";

type ProductGridViewProps = {
  product?: Product;
};

function ProductGridView({ product }: ProductGridViewProps) {
  if (product) {
    return (
      <div className="flex w-full flex-col items-center bg-gray-500 p-4">
        <div className="flex w-full items-center justify-center bg-slate-300">
          <Image className="h-5/6 w-5/6" />
        </div>
        <p>{product.name}</p>
        <p>{product.price}€</p>
      </div>
    );
  } else {
    return <div className="h-96 w-full bg-gray-500"></div>;
  }
}

export default ProductGridView;
