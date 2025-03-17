import { Product } from "@/models/product";
import { Image } from "lucide-react";

type ProductGridViewProps = {
  product?: Product;
};

function ProductGridView({ product }: ProductGridViewProps) {
  if (product) {
    return (
      <div className="border-primary-bg-2 flex w-full flex-col items-center border-2 p-4 shadow-sm">
        <div className="bg-primary-bg-2 flex w-full items-center justify-center">
          <Image className="text-primary-text-2 h-5/6 w-5/6" />
        </div>
        <p>{product.name}</p>
        <p>{product.price}€</p>
      </div>
    );
  } else {
    return <div className="bg-primary-bg-3 h-96 w-full"></div>;
  }
}

export default ProductGridView;
