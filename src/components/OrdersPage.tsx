import { useGetOrders } from "./queries/useOrdersQuery"

export const OrdersPage = ()  => {

    const {data, isLoading, isError} = useGetOrders()

    return <div>
        {data?.map((order) => (
            <div key={order.orderNumber}>
                <p>{order.orderNumber}</p>
                <p>{order.totalPrice}</p>
                <p>{order.status}</p>
            </div>
        ))}
    </div>
}