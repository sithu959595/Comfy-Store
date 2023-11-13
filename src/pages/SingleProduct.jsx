import { useLoaderData } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOptions } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { current } from "@reduxjs/toolkit";
import { addItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};
export const loader = (queryClient) => {
  return async ({ requst, params }) => {
    const productId = params.id;
    const response = await queryClient.ensureQueryData(
      singleProductQuery(productId)
    );
    // const response = await customFetch(`/products/${productId}`);
    const product = response.data.data;
    return { product };
  };
};

export default function SingleProduct() {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarAmount = formatPrice(price);
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  function handleAmount(e) {
    setAmount(parseInt(e.target.value));
  }
  const dispatch = useDispatch();
  const cartProduct = {
    cartID: product.id + color,
    productID: product.id,
    image,
    title,
    price,
    company,
    color,
    amount,
  };
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="grid lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="capitalize text-md font-medium tracking-wider ">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((each) => {
                return (
                  <button
                    key={each}
                    className={`badge w-6 h-6 mr-2 ${
                      each === color ? "border-2 border-secondary" : ""
                    }`}
                    style={{ backgroundColor: each }}
                    onClick={() => {
                      setColor(each);
                    }}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              name="amount"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
