import { useQuery } from "@tanstack/react-query";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils/index";
const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export default function Landing() {
  return (
    <h1 className="text-4xl">
      <Hero />
      <FeaturedProducts />
    </h1>
  );
}
export const loader = (queryClient) => {
  return async () => {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);
    console.log("res", response);
    const products = response.data.data;
    // const data = await fetch(
    //   "https://strapi-store-server.onrender.com/api/products?featured=true"
    // );
    // console.log("data", data);
    // const data1 = await data.json();
    // console.log("data1", data1);
    console.log("loading data for products", { products });
    return { products };
  };
};
