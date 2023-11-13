import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const [isGrid, setIsGrid] = useState(true);
  console.log(meta);
  function showList() {
    setIsGrid(false);
  }
  function showGrid() {
    setIsGrid(true);
  }
  function setActive() {
    return "btn-primary text-primary-content";
  }
  return (
    <div>
      <div className="flex items-center justify-between pb-5 px-8 mt-8 border-b border-base-300 ">
        <h4 className="font-medium text-md">
          {meta.pagination.total} product{meta.pagination.total > 1 ? "s" : ""}
        </h4>
        <div className="flex gap-x-2">
          <button
            onClick={showList}
            className={`text-xl btn btn-circle btn-sm ${
              isGrid ? "btn-ghost text-base-content" : setActive()
            }`}
          >
            <BsList className="" />
          </button>
          <button
            onClick={showGrid}
            className={`text-xl btn btn-circle btn-sm ${
              isGrid ? setActive() : "btn-ghost text-base-content"
            }`}
          >
            <BsFillGridFill className="" />
          </button>
        </div>
      </div>
      {meta.pagination.total === 0 ? (
        "Sorry,no products matched..."
      ) : isGrid ? (
        <ProductsGrid />
      ) : (
        <ProductsList />
      )}
    </div>
  );
};
export default ProductsContainer;
