import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.npoint.io",
  }),
  endpoints: (builder) => ({
    getWines: builder.query<DataProps[], void>({
      query: () => `/50aefbd7ecf2b77a3260`,
    }),
  }),
});

export const { useGetWinesQuery } = apiSlice;
