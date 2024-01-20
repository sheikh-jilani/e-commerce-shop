import { Base_Url } from "../constants";
import apiSlice from "./apiSlice";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNum, keyword }) => ({
        url: `${Base_Url}api/products`,
        params: { pageNum, keyword },
      }),
      keepUnusedDataFor: 5,
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `${Base_Url}api/products/all`,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${Base_Url}api/product/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${Base_Url}api/product/${id}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: `${Base_Url}api/product/create`,
        method: "POST",
      }),
      keepUnusedDataFor: 5,
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${Base_Url}api/product/update/${data._id}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${Base_Url}api/upload`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: ({ review, id }) => ({
        url: `${Base_Url}api/product/review/${id}`,
        method: "POST",
        body: review,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useCreateReviewMutation,
} = productApiSlice;
