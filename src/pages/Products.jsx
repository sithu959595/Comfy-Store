import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url = "/products";
const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params: queryParams }),
  };
};
export default function Products() {
  console.log("products");
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}
export function loader(queryClient) {
  return async ({ request }) => {
    console.log("loader from porducts");
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    // console.log([...new URL(request.url).searchParams.entries()]);
    // const response = await customFetch(url, { params });
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    console.log("re", response);
    return { products: response.data.data, meta: response.data.meta, params };
  };
}
export async function action({ request }) {
  console.log("actyion from porducts");
  return null;
}
