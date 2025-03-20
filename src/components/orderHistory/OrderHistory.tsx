import { useGetOrders } from "../queries/useOrdersQuery";
import OrderHistoryElement from "./OrderHistoryElement";

function OrderHistory() {
  const { data, isLoading, isError } = useGetOrders();

  if (Array.isArray(data) && data.length === 0) {
    return;
  }

  return (
    <div className="my-6 flex w-full max-w-[600px] flex-col items-center justify-center gap-2 self-center px-2">
      <p className="self-start text-lg font-bold">Deine Bestellhistorie</p>
      {Array.isArray(data) &&
        data.map((order) => (
          <OrderHistoryElement
            order={order}
            key={`order-history-element-${order.orderNumber}`}
          />
        ))}
    </div>
  );
}

export default OrderHistory;
