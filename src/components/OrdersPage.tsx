import { useGetOrders } from "./queries/useOrdersQuery"

export const OrdersPage = ()  => {

    const {data, isLoading, isError} = useGetOrders()

    if(isLoading) {
        return (
            <div>I AM LOADING !!!!!11!!1!</div>
        )
    }
    if(isLoading) {
        return (
            <div>I AM ERROR :(</div>
        )
    }

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