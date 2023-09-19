/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { formatCurreny } from "../../utils/Helper";
import DeleteItem from "./DeleteItem";
import UpdateQuantityItem from "./UpdateQuantityItem";
import { getQuantityById } from "./CartSlice";

function CartItem({item}) {
  const currentQuantity = useSelector(getQuantityById(item.pizzaId))
  return (
    <li className="py-3  flex flex-col justify-start sm:flex-row sm:justify-between sm:items-center">
      <p className="mb-1 sm:mb-0">
        {item.quantity}x {item.name}
      </p>
      <div className="flex  justify-between items-center gap-6">
        <p className="text-sm font-bold">{formatCurreny(item.totalPrice)}</p>
        <div className="flex gap-3">
        <UpdateQuantityItem pizzaId={item.pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={item.pizzaId}/>
        </div>

      </div>
    </li>
  );
}

export default CartItem;
