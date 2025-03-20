import { Product } from "@/models/product";
import { useAddShoppingCartPosition } from "../queries/useShoppingCartQuerys";
import { UUID } from "crypto";
import { Image, Minus, Plus, ShoppingCart } from "lucide-react";
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
        <div className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-primary-bg-3 bg-primary-bg-2 p-3 shadow-md">
          <div className="col-span-3 flex h-full w-full items-center justify-center bg-primary-bg-2 bg-white">
            <img
              src={product.imageUrl}
              className={`h-full w-full object-contain text-primary-text-2 ${!imageLoaded && "hidden"}`}
              onLoad={() => {
                setImageLoaded(true);
              }}
              onError={() => {}}
            />
            {!imageLoaded && (
              <Image className="h-5/6 w-5/6 text-primary-text-2" />
            )}
          </div>
          <div className="flex w-full">
            <div className="flex w-full flex-1 flex-col self-center pl-1">
              <p className="font-bold">{product.name}</p>
              <p>{product.price} €</p>
            </div>

            <div className="flex flex-col items-center justify-end gap-1 self-end">
              <Tooltip>
                <TooltipTrigger
                  asChild
                  className="h-8 w-8 rounded-md bg-primary-text-1 p-1 text-center text-primary-bg-1"
                >
                  <MotionButton
                    onClick={() => handleBuyButton(product.id)}
                    className="relative"
                  >
                    <p className="absolute bottom-3 right-0.5">+</p>
                    <ShoppingCart className="h-5 w-5" />
                  </MotionButton>
                </TooltipTrigger>
                <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
                  <p>Zum Warenkorb hinzufügen</p>
                </TooltipContent>
              </Tooltip>
              <div className="flex items-center gap-0.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionButton
                      onClick={() => handleSetAmountChange(amount - 1)}
                    >
                      <Minus className="h-5 w-5" />
                    </MotionButton>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
                    <p>Anzahl erhöhen</p>
                  </TooltipContent>
                </Tooltip>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number.parseInt(e.target.value))}
                  min={1}
                  max={10}
                  className="h-8 w-8 rounded bg-primary-text-1 text-center text-primary-bg-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MotionButton
                      onClick={() => handleSetAmountChange(amount + 1)}
                      className="text-xl"
                    >
                      <Plus className="h-5 w-5" />
                    </MotionButton>
                  </TooltipTrigger>
                  <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
                    <p>Anzahl verringern</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    );
  } else {
    return <div className="h-96 w-full bg-primary-bg-3"></div>;
  }
}

export default ProductGridElement;
