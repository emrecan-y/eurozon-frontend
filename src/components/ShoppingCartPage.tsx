import { UUID } from "crypto";
import {
  useGetShoppingCartPositions,
  useRemoveShoppingCartPosition,
} from "./queries/useShoppingCartQuerys";
import { useAddOrders } from "./queries/useOrdersQuery";
import { useEffect, useState } from "react";

function ShoppingCartPage() {
  const {
    data: shoppingCartList,
    isLoading,
    isError,
  } = useGetShoppingCartPositions();

  const removeMutation = useRemoveShoppingCartPosition();
  const orderMutation = useAddOrders();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (Array.isArray(shoppingCartList) && shoppingCartList.length > 0) {
      const sum = shoppingCartList
        .map((e) => Number.parseFloat(e.product.price))
        .reduce((a, b) => a + b);
      setTotal(sum);
    }
  }, [shoppingCartList]);

  const productCount =
    Array.isArray(shoppingCartList) && shoppingCartList.length > 0
      ? shoppingCartList.map((item) => item.amount).reduce((a, b) => a + b)
      : 0;

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
    <div className="my-12 flex h-full w-full flex-col items-center justify-center gap-6">
      {shoppingCartList.map((cartItem) => (
        <div
          key={cartItem.id}
          className="flex h-64 w-3/5 flex-row items-center justify-center rounded-2xl bg-primary-bg-2 p-4 shadow-xl"
        >
          <img
            src={cartItem.product.imageUrl}
            className="h-4/5 pl-12 text-primary-text-2"
          />
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg p-2 px-6 align-middle">
            <p className="font-bold">{cartItem.product.name}</p>
            <p>{cartItem.product.description}</p>
            <p className="font-bold">{cartItem.amount}</p>
            <p className="font-bold">{cartItem.product.price}€</p>
            <button
              className="rounded-md bg-red-700 p-2 transition-all hover:bg-red-600"
              onClick={() => handleRemoveButton(cartItem.product.id)}
            >
              Item Entfernen
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-white p-12 shadow-lg">
        <p className="font-bold">Gesamtpreis: {total} €</p>
        <p className="font-semibold">Artikelanzahl: {productCount}</p>
        <button
          className="rounded-md bg-green-700 p-2 transition-all hover:bg-green-600"
          onClick={handleBuyButton}
        >
          Kauf Abschließen
        </button>
      </div>
    </div>
  );
}
export default ShoppingCartPage;
