/* eslint-disable react/prop-types */

import { formatCurreny } from "../../utils/Helper";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurreny(totalPrice)}</p>
      </div>
      <p className="text-sm text-slate-500 italic capitalize">{isLoadingIngredients ? 'loading...' : ingredients.join(', ')}</p>
    </li>
  );
}

export default OrderItem;
