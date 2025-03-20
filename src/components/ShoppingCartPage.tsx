import { UUID } from "crypto";
import {
  useGetShoppingCartPositions,
  useRemoveShoppingCartPosition,
  useUpdateShoppingCartPosition,
} from "./queries/useShoppingCartQuerys";
import { useAddOrders } from "./queries/useOrdersQuery";
import { useEffect, useState } from "react";

function ShoppingCartPage() {
  const {
    data: shoppingCartList,
    isLoading,
    isError,
  } = useGetShoppingCartPositions();

  const updateMutation = useUpdateShoppingCartPosition();
  const removeMutation = useRemoveShoppingCartPosition();
  const orderMutation = useAddOrders();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(0);
    if (Array.isArray(shoppingCartList) && shoppingCartList.length > 0) {
      const sum = shoppingCartList
        .map((e) => Number.parseFloat(e.product.price) * e.amount)
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

  const handleAmountChange = (newAmount: number, currentProductId: UUID) => {
    if (newAmount >= 1) {
      updateMutation.mutate({ amount: newAmount, productId: currentProductId });
    }
  };

  if (isLoading) {
    return <div>ICH BIN LOADING</div>;
  }
  if (isError) {
    return <div>ICH BIN ERROR</div>;
  }

  return (
    <div className="my-12 flex h-full w-full flex-col items-center justify-center gap-6">
      {shoppingCartList
        .sort((a, b) => a.product.id.localeCompare(b.product.id))
        .map((cartItem) => (
          <div
            key={cartItem.id}
            className="flex h-64 w-5/6 flex-row items-center justify-center rounded-2xl bg-primary-bg-2 p-4 shadow-xl lg:w-3/5"
          >
            <img
              src={cartItem.product.imageUrl}
              className="h-1/2 lg:h-4/5 px-2 lg:pl-12 text-primary-text-2 "
            />
            <div className="flex w-full flex-col text-center items-center justify-center gap-1 rounded-lg p-2 px-6 text-sm lg:gap-3 lg:text-base">
              <p className="font-bold">{cartItem.product.name}</p>
              <p>{cartItem.product.description}</p>
              <p className="font-bold">{cartItem.product.price}€</p>
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() =>
                    handleAmountChange(cartItem.amount - 1, cartItem.product.id)
                  }
                  className="mb-1 h-6 w-6 text-lg transition-colors hover:bg-gray-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={cartItem.amount}
                  onChange={(e) =>
                    handleAmountChange(
                      Number.parseInt(e.target.value),
                      cartItem.product.id,
                    )
                  }
                  min={1}
                  max={10}
                  className="h-6 w-12 rounded border border-gray-300 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  onClick={() =>
                    handleAmountChange(cartItem.amount + 1, cartItem.product.id)
                  }
                  className="mb-1 h-6 w-6 self-center text-center align-middle text-lg transition-colors hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                className="rounded-md text-gray-100 bg-red-700 px-2 py-1  lg:text-base lg:p-2 transition-all hover:bg-red-600 hover:cursor-pointer"
                onClick={() => handleRemoveButton(cartItem.product.id)}
              >
                Item Entfernen
              </button>
            </div>
          </div>
        ))}
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-white p-12 shadow-lg">
        <p className="font-bold">Gesamtpreis: {total.toFixed(2)} €</p>
        <p className="font-semibold">Artikelanzahl: {productCount}</p>
        <button
          className="rounded-md bg-green-700 text-gray-100 p-2 transition-all hover:bg-green-600 hover:cursor-pointer disabled:opacity-50"
          onClick={handleBuyButton}
          disabled={shoppingCartList.length <= 0 ? true : false}
        >
          Kauf Abschließen
        </button>
      </div>
    </div>
  );
}
export default ShoppingCartPage;
