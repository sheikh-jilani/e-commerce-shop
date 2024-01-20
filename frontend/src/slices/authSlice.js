import { Base_Url } from "../constants";
import apiSlice from "./apiSlice";
export const authApi = apiSlice.injectEndpoints({
  TagTypes: ["users"],
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${Base_Url}api/users/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    updateAdminUser: builder.mutation({
      query: (data) => ({
        url: `${Base_Url}api/users/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
        invalidatsTags: ["users"],
      }),
    }),
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: `${Base_Url}api/users/login`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    logout: builder.mutation({
      query: (data) => {
        return {
          url: `${Base_Url}api/users/logout`,

          credentials: "include",
        };
      },
    }),
    autoLogIn: builder.query({
      query: () => ({
        url: `${Base_Url}api/users/autoLogin`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    register: builder.mutation({
      query: (data) => {
        return {
          url: `${Base_Url}api/users/register`,
          method: "POST",
          body: data,
        };
      },
    }),

    // admin routes
    deleteUserById: builder.mutation({
      query: (id) => {
        return {
          url: `${Base_Url}api/users/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      keepUnusedDataFor: 5,
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `${Base_Url}api/users`,
          credentials: "include",
          providesTags: ["users"],
        };
      },
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
      query: (id) => {
        return {
          url: `${Base_Url}api/users/${id}`,
          credentials: "include",
        };
      },
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useLogInMutation,
  useRegisterMutation,
  useDeleteUserByIdMutation,
  useAutoLogInQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useUpdateAdminUserMutation,
} = authApi;
