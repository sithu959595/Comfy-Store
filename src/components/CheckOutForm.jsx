import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export default function CheckOutForm() {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
}
export function action(store, queryClient) {
  return async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;
    // console.log(store);
    const info = {
      name,
      address,
      cartItems,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      numItemsInCart,
    };
    try {
      console.log(user.token);
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      store.dispatch(clearCart());
      toast.success("Orders placed");
      queryClient.removeQueries(["orders"]);
      return redirect("/orders");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "There is an error for placing orders"
      );
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
    return null;
  };
}
