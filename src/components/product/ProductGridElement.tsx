import { Product } from "@/models/product";
import { useAddShoppingCartPosition } from "../queries/useShoppingCartQuerys";
import { UUID } from "crypto";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import MotionButton from "../ui/MotionButton";
import { toast } from "react-toastify";
import NumberInputWithIncrement from "../ui/NumberInputWithIncrement";
import ImageLoader from "../ui/ImageLoader";
import { useAuthUser } from "../../hooks/useAuthUser";

type ProductGridElement = {
  product?: Product;
};

function ProductGridElement({ product }: ProductGridElement) {
  const addMutation = useAddShoppingCartPosition();
  const [amount, setAmount] = useState<number>(1);
  const { user } = useAuthUser();

  const handleBuyButton = (productId: UUID) => {
    if (user) {
      addMutation.mutate({ productId, amount });
    } else {
      toast.error("Für diese Funktion müssen Sie sich anmelden.");
    }
  };

  if (product) {
    return (
      <div className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-primary-bg-3 bg-primary-bg-2 p-3 shadow-md">
        <div className="col-span-3 flex h-full min-h-52 w-full items-center justify-center bg-primary-bg-2 bg-white">
          <ImageLoader imageUrl={product.imageUrl} />
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
            <NumberInputWithIncrement value={amount} setValue={setAmount} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="h-96 w-full bg-primary-bg-3"></div>;
  }
}

export default ProductGridElement;
