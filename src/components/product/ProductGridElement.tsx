import { Product } from "@/models/product";
import { useAddShoppingCartPosition } from "../queries/useShoppingCartQuerys";
import { UUID } from "crypto";
import { Image, ShoppingCart } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import MotionButton from "../ui/MotionButton";
import { TooltipProvider } from "../ui/tooltip";

type ProductGridElement = {
  product?: Product;
};

function ProductGridElement({ product }: ProductGridElement) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const addMutation = useAddShoppingCartPosition();
  const [amount, setAmount] = useState<number>(1);

  const handleBuyButton = (productId: UUID) => {
    addMutation.mutate({ productId, amount });
  };

  const handleSetAmountChange = (newAmount: number) => {
    if (newAmount > 9) {
    } else if (newAmount >= 1) {
      setAmount(newAmount);
    } else {
      setAmount(1);
    }
  };

  if (product) {
    return (
      <TooltipProvider>
      <div className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-primary-bg-3 bg-primary-bg-2 p-4 shadow-md">
        <div className="flex w-full items-center justify-center bg-primary-bg-2">
          <img
            src={product.imageUrl}
            className={`h-5/6 text-primary-text-2 ${!imageLoaded && "hidden"}`}
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={() => {}}
          />
          {!imageLoaded && (
            <Image className="h-5/6 w-5/6 text-primary-text-2" />
          )}
        </div>
        <div className="flex w-full items-center justify-center bg-primary-bg-2"></div>
        <p className="font-bold">{product.name}</p>
        <p>{product.price}€</p>
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => handleSetAmountChange(amount - 1)}
            className="mb-1 h-6 w-6 text-lg transition-colors hover:bg-gray-200"
          >
            -
          </button>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number.parseInt(e.target.value))}
            min={1}
            max={10}
            className="h-6 w-12 text-gray-600 rounded border border-gray-300 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            onClick={() => handleSetAmountChange(amount + 1)}
            className="mb-1 h-6 w-6 self-center text-center align-middle text-lg transition-colors hover:bg-gray-200"
          >
            +
          </button>
        </div>
        <Tooltip>
          <TooltipTrigger asChild className="w-fit">
            <MotionButton
              onClick={() => handleBuyButton(product.id)}
              className="relative"
            >
              <p className="absolute -right-2 bottom-3.5 text-accent-2">+</p>
              <ShoppingCart className="text-accent-2 h-7 w-7" />
            </MotionButton>
          </TooltipTrigger>
          <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
            <p>Zum Warenkorb hinzufügen</p>
          </TooltipContent>
        </Tooltip>
        {/* <ShoppingCart className="h-7 w-7">
          <button
            className="rounded-md bg-blue-500 p-2"
            onClick={() => handleBuyButton(product.id)}
          >
            Add to Cart
          </button>
        </ShoppingCart> */}
      </div>
      </TooltipProvider>
    );
  } else {
    return <div className="h-96 w-full bg-primary-bg-3"></div>;
  }
}


export default ProductGridElement;
