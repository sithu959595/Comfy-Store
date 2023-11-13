import { useSelector } from "react-redux";
import { CartItemsList, CartTotal, SectionTitle } from "../components";
import { Link } from "react-router-dom";

export default function Cart() {
  const user = useSelector((state) => state.userState.user);
  const { cartItems, numItemsInCart, cartTotal, shipping, tax, orderTotal } =
    useSelector((state) => state.cartState);
  // console.log("from cart", cartItems);
  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
