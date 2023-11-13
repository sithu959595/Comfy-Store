import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      params.page ? parseInt(params.page) : 1,
      user.username,
    ],
    queryFn: () =>
      customFetch("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};
export default function Orders() {
  const { orders, meta } = useLoaderData();
  console.log("orders1", orders);
  if (orders.length === 0) {
    return <SectionTitle text="plase make an order first" />;
  }
  return (
    <>
      <SectionTitle text="Orders List" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}
export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("login first please");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log("para", params);
    try {
      // const response = await customFetch(
      //   "/orders",

      //   {
      //     params,
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   }
      // );
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      console.log("orders", response);

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message ||
          "There is an error for getting orders"
      );
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return null;
    }
    return null;
  };
