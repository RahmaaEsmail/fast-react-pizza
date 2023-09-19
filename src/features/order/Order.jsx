import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import { calcMinutesLeft, formatCurreny, formatDate } from "../../utils/Helper";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher()

  useEffect(function(){
    if(!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu')
    }
  },[fetcher])


  return (
    <div className="py-6 px-4 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status </h2>

        <div className="space-x-2">
          {priority && (
            <span className="bg-red-500 rounded-full px-3 py-1 text-sm font-semibold uppercase text-red-50 -tracking-wide">
              Priority
            </span>
          )}
          <span className="bg-green-500 rounded-full px-3 py-1 text-sm font-semibold uppercase text-green-50 -tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} isLoadingIngredients={fetcher.state==='loading'} ingredients={fetcher?.data?.find(ele => ele.id === item.pizzaId)?.ingredients ?? []} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-stone-600 text-sm font-medium">
          Price pizza: {formatCurreny(orderPrice)}
        </p>
        {priority && (
          <p className="text-stone-600 text-sm font-medium">
            Price priority: {formatCurreny(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurreny(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder/>}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
