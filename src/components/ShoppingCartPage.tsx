import { UUID } from "crypto";
import {
  useGetShoppingCartPositions,
  useRemoveShoppingCartPosition,
  useUpdateShoppingCartPosition,
} from "./queries/useShoppingCartQuerys";
import { useAddOrders } from "./queries/useOrdersQuery";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import NumberInputWithIncrement from "./ui/NumberInputWithIncrement";
import MotionButton from "./ui/MotionButton";
import ImageLoader from "./ui/ImageLoader";
import { useAuthUser } from "./hooks/useAuthUser";

function ShoppingCartPage() {
  const {
    data: shoppingCartList,
    isLoading,
    isError,
  } = useGetShoppingCartPositions();

  const { user } = useAuthUser();

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
    if (newAmount >= 9) {
      updateMutation.mutate({ amount: 9, productId: currentProductId });
    } else if (newAmount >= 1) {
      updateMutation.mutate({ amount: newAmount, productId: currentProductId });
    }
  };

  if (!user) {
    return <div>Für diese Funktion müssen Sie sich anmelden.</div>;
  }

  if (isLoading) {
    return <div>ICH BIN LOADING</div>;
  }
  if (isError) {
    return <div>ICH BIN ERROR</div>;
  }

  return (
    <div className="mx-2 my-6 flex h-full flex-col gap-6 self-center lg:my-12 lg:flex-row">
      <div className="mx-2 flex h-full flex-col gap-6 self-center px-2 lg:px-4">
        {shoppingCartList
          .sort((a, b) => a.product.id.localeCompare(b.product.id))
          .map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex h-fit w-full flex-row items-center justify-center rounded-xl border border-primary-bg-3 bg-primary-bg-2 p-4 shadow-xl lg:px-10"
            >
              <div>
                <div className="ml-8 h-32 w-32 rounded-lg sm:h-52 sm:w-52">
                  <ImageLoader
                    imageUrl={cartItem.product.imageUrl}
                  ></ImageLoader>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-1 rounded-xl p-2 px-6 text-center text-sm lg:gap-3 lg:text-base">
                <p className="font-bold">{cartItem.product.name}</p>
                <p className="text-xs lg:text-sm">
                  {cartItem.product.description}
                </p>
                <p className="font-bold">{cartItem.product.price}€</p>
                <NumberInputWithIncrement
                  value={cartItem.amount}
                  setValue={(value) => {
                    handleAmountChange(value, cartItem.product.id);
                  }}
                />
                <MotionButton
                  onClick={() => handleRemoveButton(cartItem.product.id)}
                >
                  <Trash2 />
                </MotionButton>
              </div>
            </div>
          ))}
      </div>
      <div className="sticky top-24 flex h-fit flex-col items-center justify-center gap-2 rounded-xl border border-primary-bg-3 bg-primary-bg-2 p-12 shadow-lg">
        <p className="font-bold">Gesamtpreis: {total.toFixed(2)} €</p>
        <p className="text-sm text-accent-1">Versandkosten frei</p>
        <p className="p-2 font-semibold">Artikelanzahl: {productCount}</p>
        <button
          className="rounded-md bg-primary-text-2 p-2 text-primary-bg-2 transition-all hover:cursor-pointer hover:bg-green-600 disabled:opacity-50"
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
