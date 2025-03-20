import { Product } from "@/models/product";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import { ShoppingCart } from "lucide-react";
import MotionButton from "./MotionButton";
import { UUID } from "crypto";
import { useState } from "react";
import { useAddShoppingCartPosition } from "../queries/useShoppingCartQuerys";

export const ProductCard = ({ product }: { product: Product }) => {
  const addMutation = useAddShoppingCartPosition();

  const handleBuyButton = (productId: UUID) => {
    addMutation.mutate({ productId, amount: 1 });
  };

  return (
    <TooltipProvider>
      <div className="p-4">
        <div className="flex h-56 w-32 lg:h-72 lg:w-56 flex-col items-center justify-around rounded-lg border border-primary-bg-3 bg-primary-bg-2 p-4 gap-1 text-center shadow-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-32 object-cover"
          />
          <h3 className="mt-2 font-semibold text-sm lg:text-base">{product.name}</h3>
          <div className="flex flex-row gap-2 text-sm lg:text-base">
            <p className="mt-1 font-bold">{product.price}€</p>
            <Tooltip>
              <TooltipTrigger asChild className="w-fit">
                <MotionButton
                  onClick={() => handleBuyButton(product.id)}
                  className="relative"
                >
                  <p className="absolute -right-2 bottom-3.5 text-accent-2">
                    +
                  </p>
                  <ShoppingCart className="h-5 w-5 text-accent-2" />
                </MotionButton>
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
                <p>Zum Warenkorb hinzufügen</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
