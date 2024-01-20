import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Base_Url } from "../constants";
const baseQuery = fetchBaseQuery({
  baseUrl: Base_Url,
  credentials: "include",
});
const apiSlice = createApi({
  reducerPath: "",
  baseQuery,
  endpoints: () => ({}),
});
export default apiSlice;
