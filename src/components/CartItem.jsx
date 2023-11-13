import { formatPrice, generateAmountOptions } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  return (
    <article
      key={cartItem.cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      ></img>
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{cartItem.title}</h3>
        <h4 className="capitalize mt-2 text-sm text-neutral-content">
          {cartItem.company}
        </h4>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: cartItem.color }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amout</span>
          </label>
          <select
            name="amount"
            id="amount"
            value={cartItem.amount}
            className="mt-2 select select-base select-bordered select-xs"
            onChange={(e) => {
              dispatch(
                editItem({ cartID: cartItem.cartID, amount: e.target.value })
              );
            }}
          >
            {generateAmountOptions(cartItem.amount + 5)}
          </select>
        </div>
        <button
          onClick={() => {
            dispatch(removeItem({ cartID: cartItem.cartID }));
          }}
          className="mt-2 link link-primary link-hover text-sm"
        >
          Remove
        </button>
      </div>
      <p className="font-medium sm:ml-auto">{formatPrice(cartItem.price)}</p>
    </article>
  );
};
export default CartItem;
