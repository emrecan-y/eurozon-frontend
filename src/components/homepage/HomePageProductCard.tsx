import { Product } from "@/models/product";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { ShoppingCart } from "lucide-react";
import MotionButton from "../ui/MotionButton";
import { UUID } from "crypto";
import { useAddShoppingCartPosition } from "../queries/useShoppingCartQuerys";
import { useUserQuery } from "../queries/useUserQuery";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import ImageLoader from "../ui/ImageLoader";

type HomePageProductCardProps = {
  product: Product;
};

function HomePageProductCard({ product }: HomePageProductCardProps) {
  const addMutation = useAddShoppingCartPosition();
  const userQuery = useUserQuery();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const handleBuyButton = (productId: UUID) => {
    if (userQuery.data?.name && cookies.access_token) {
      addMutation.mutate({ productId, amount: 1 });
    } else {
      toast.error("Für diese Funktion müssen Sie sich anmelden.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex h-56 w-32 flex-col items-center justify-around gap-1 rounded-lg border border-primary-bg-3 bg-primary-bg-2 p-4 text-center shadow-lg lg:h-72 lg:w-56">
        <ImageLoader imageUrl={product.imageUrl} />

        <h3 className="mt-2 text-sm font-semibold lg:text-base">
          {product.name}
        </h3>
        <div className="flex flex-row gap-2 text-sm lg:text-base">
          <p className="mt-1 font-bold">{product.price}€</p>
          <Tooltip>
            <TooltipTrigger asChild className="w-fit">
              <MotionButton
                onClick={() => handleBuyButton(product.id)}
                className="relative"
              >
                <p className="absolute -right-2 bottom-3.5 text-accent-2">+</p>
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
  );
}

export default HomePageProductCard;
