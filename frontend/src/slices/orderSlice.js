import { Base_Url } from "../constants";
import apiSlice from "./apiSlice";
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: `${Base_Url}api/orders`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    getOrder: builder.query({
      query: (OrderId) => {
        return {
          credentials: "include",
          url: `${Base_Url}api/orders/${OrderId}`,
        };
      },
    }),
    getMyOrders: builder.query({
      query: () => {
        return {
          credentials: "include",
          url: `${Base_Url}api/orders/myOrders`,
        };
      },
      keepUnusedDataFor: 5,
    }),
    allOrders: builder.query({
      query: () => {
        return {
          credentials: "include",
          url: `${Base_Url}api/orders`,
        };
      },
      keepUnusedDataFor: 5,
    }),
    setDelivered: builder.mutation({
      query: (data) => {
        return {
          credentials: "include",
          url: `${Base_Url}api/orders/${data}/deliver`,
          method: "POST",
        };
      },
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useAllOrdersQuery,
  useGetMyOrdersQuery,
  useSetDeliveredMutation,
} = authApi;
