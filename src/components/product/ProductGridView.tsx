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
  };

  console.log(product?.imageUrl);

  if (product) {
    return (
      <div className="flex w-full flex-col items-center gap-2 border-2 border-primary-bg-2 p-4 shadow-sm">
        <div className="flex w-full items-center justify-center bg-primary-bg-2">
          <img
            src={product.imageUrl}
            className="h-5/6 w-5/6 text-primary-text-2"
          />
        </div>
        <p className="font-bold">{product.name}</p>
        <p>{product.price}€</p>
        <button
          className="rounded-md bg-blue-600 p-2"
          onClick={() => handleBuyButton(product.id, 1)}
        >
          Add to Cart
        </button>
      </div>
    );
  } else {
    return <div className="h-96 w-full bg-primary-bg-3"></div>;
  }
}

export default ProductGridView;
