import { UUID } from "crypto";
import {
  useGetShoppingCartPositions,
  useRemoveShoppingCartPosition,
} from "./queries/useShoppingCartQuerys";
import { Image } from "lucide-react";
import { useAddOrders } from "./queries/useOrdersQuery";

export const CartPage = () => {
  const {
    data: shoppingCartList,
    isLoading,
    isError,
  } = useGetShoppingCartPositions();

  const removeMutation = useRemoveShoppingCartPosition();
  const orderMutation = useAddOrders();

  const handleRemoveButton = (cartId: UUID) => {
    removeMutation.mutate(cartId);
  };

  const handleBuyButton = () => {
    orderMutation.mutate();
  };

  if (isLoading) {
    return <div>ICH BIN LOADING</div>;
  }
  if (isError) {
    return <div>ICH BIN ERROR</div>;
  }

  return (
    <div className="my-8 flex h-full w-full flex-col items-center justify-center gap-6">
      {shoppingCartList.map((cartItem) => (
        <div
          key={cartItem.id}
          className="flex h-2/5 w-4/5 flex-row items-center justify-center bg-primary-bg-2 p-4 shadow-xl"
        >
          <Image className="h-4/5 w-2/5 text-primary-text-2" />
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg p-2 px-6 align-middle">
            <p className="font-bold">{cartItem.product.name}</p>
            <p>{cartItem.product.description}</p>
            <p className="font-bold">{cartItem.amount}</p>
            <p className="font-bold">{cartItem.product.price}€</p>
            <button
              className="rounded-md bg-red-700 p-2"
              onClick={() => handleRemoveButton(cartItem.product.id)}
            >
              Item Entfernen
            </button>
          </div>
        </div>
      ))}
      <button className="rounded-md bg-green-700 p-2" onClick={handleBuyButton}>
        Kauf Abschließen
      </button>
    </div>
  );
};
