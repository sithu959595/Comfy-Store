import { useSelector } from "react-redux";
import { CartTotal, CheckOutForm, SectionTitle } from "../components";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export default function Checkout() {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is Empty!"></SectionTitle>;
  }
  return (
    <>
      <SectionTitle text="Place your order"></SectionTitle>
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckOutForm />
        <CartTotal />
      </div>
    </>
  );
}

export function loader(store) {
  return () => {
    console.log("checkout loader");
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("login first");
      return redirect("/login");
    }
    return null;
  };
}
