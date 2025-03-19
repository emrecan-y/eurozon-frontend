import { Product } from "@/models/product";
import { ShoppingCartPosition } from "@/models/shoppingcartPosition";
import { Image } from "lucide-react";
import { useAddShoppingCartPosition } from "../queries/useShoppingCartQuerys";
import { UUID } from "crypto";

type ProductGridViewProps = {
  product?: Product;
};

function ProductGridView({ product }: ProductGridViewProps) {

  const addMutation = useAddShoppingCartPosition();

  const handleBuyButton = (productId: UUID, amount: number) => {
    addMutation.mutate({ productId, amount });
  }

  if (product) {
    return (
      <div className="border-primary-bg-2 flex w-full flex-col items-center gap-2 border-2 p-4 shadow-sm">
        <div className="bg-primary-bg-2 flex w-full items-center justify-center">
          <Image className="text-primary-text-2 h-5/6 w-5/6" />
        </div>
        <p className="font-bold">{product.name}</p>
        <p>{product.price}€</p>
        <button
        className="bg-blue-600 p-2 rounded-md"
          onClick={() => handleBuyButton(product.id, 1)}>
          Add to Cart
        </button>
      </div>
    );
  } else {
    return <div className="bg-primary-bg-3 h-96 w-full"></div>;
  }
}

export default ProductGridView;
