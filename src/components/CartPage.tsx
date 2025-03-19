import { UUID } from "crypto";
import {
  useGetShoppingCartPositions,
  useRemoveShoppingCartPosition,
} from "./queries/useShoppingCartQuerys";
import { Bold } from "lucide-react";
import { Image } from "lucide-react";

export const CartPage = () => {
  const {
    data: shoppingCartList,
    isLoading,
    isError,
  } = useGetShoppingCartPositions();

  const removeMutation = useRemoveShoppingCartPosition();

  const handleRemoveButton = (cartId: UUID) => {
    removeMutation.mutate(cartId);
  };

  const handleBuyButton = () => {
    
  }

  if (isLoading) {
    return <div>ICH BIN LOADING</div>;
  }
  if (isError) {
    return <div>ICH BIN ERROR</div>;
  }

  return (
    <div className="my-8 flex h-full w-full flex-col items-center justify-center gap-6">
      {shoppingCartList.map((cartItem) => (
        <div className="flex flex-row justify-center items-center bg-primary-bg-2 shadow-xl w-4/5 h-2/5 p-4">
          <Image className="text-primary-text-2 w-2/5 h-4/5" />
          <div
            className="flex flex-col items-center justify-center align-middle gap-3 rounded-lg p-2 px-6 w-full h-full "
            key={cartItem.id}
          >
            <p className="font-bold">{cartItem.product.name}</p>
            <p>{cartItem.product.description}</p>
            <p className="font-bold">{cartItem.amount}</p>
            <p className="font-bold">{cartItem.product.price}€</p>
            <button className="bg-red-700 p-2 rounded-md" onClick={() => handleRemoveButton(cartItem.product.id)}>
              Item Entfernen
            </button>
          </div>
        </div>
      ))}
      <button className="bg-green-700 rounded-md p-2"
      onClick={handleBuyButton}>
        Kauf Abschließen</button>
    </div>
  );
};
