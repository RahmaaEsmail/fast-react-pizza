import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { getUserName } from "../user/UserSlice";
import { clearCart, getCart, getTotalPrice } from "../cart/CartSlice";
import { createOrder } from "../../services/apiRestaurant";
import { useState } from "react";
import { formatCurreny, isValidPhone } from "../../utils/Helper";
import store from "./../../store";
import EmptyCart from "./../cart/EmptyCart";

function CreateOrder() {
  const userName = useSelector(getUserName);
  const cart = useSelector(getCart);
  const formErrors = useActionData();
  const navigation = useNavigation();
  const totalCartPrice = useSelector(getTotalPrice);
  const [isChecked, setIsChecked] = useState(false);
  const priorityPrice = isChecked ? totalCartPrice * 0.2 : 0;
  const totalPrice = priorityPrice + totalCartPrice;
  const isSubmitting = navigation.state === "submitting";

  if (cart.length == 0) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              d
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>
        <Button disabled={isSubmitting} type="primary">
          {isSubmitting
            ? "Placing Order..."
            : `Order now from ${formatCurreny(totalPrice)}`}
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(newOrder);
  const errors = {};
  if (!isValidPhone(newOrder.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";
  }

  if (Object.keys(errors).length > 0) return errors;

  const order = await createOrder(newOrder);
  console.log(order);
  store.dispatch(clearCart());
  return await redirect(`/order/${order.id}`);
}

export default CreateOrder;
