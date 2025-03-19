import { UUID } from "crypto";
import {
  useGetShoppingCartPositions,
  useRemoveShoppingCartPosition,
} from "./queries/useShoppingCartQuerys";
import { Image } from "lucide-react";
import { useAddOrders } from "./queries/useOrdersQuery";
import { useEffect, useState } from "react";

export const CartPage = () => {
  const {
    data: shoppingCartList,
    isLoading,
    isError,
  } = useGetShoppingCartPositions();

  const removeMutation = useRemoveShoppingCartPosition();
  const orderMutation = useAddOrders();
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setTotal(0);
    const sum = shoppingCartList
      ?.map((e) => Number.parseFloat(e.product.price))
      .reduce((a, b) => a + b);

    if (sum) {
      setTotal(sum);
      setAmount(shoppingCartList?.length)
    }
    // setTotal(sum);
    // shoppingCartList?.forEach((element) => {
    //   setTotal(total + element.amount * Number.parseInt(element.product.price));
    // });
  }, [shoppingCartList]);

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
            src={cartItem.product.scrUrl}
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
      <div className="flex flex-col justify-center items-center gap-4 rounded-2xl border bg-white shadow-lg p-12">
        <p className="font-bold">Gesamtpreis: {total} €</p>
        <p className="font-semibold">Artikelanzahl: {amount}</p>
        <button
          className="rounded-md bg-green-700 p-2 transition-all hover:bg-green-600"
          onClick={handleBuyButton}
        >
          Kauf Abschließen
        </button>
      </div>
    </div>
  );
};
