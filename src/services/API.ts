import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.npoint.io",
  }),
  endpoints: (builder) => ({
    getWines: builder.query<DataProps[], void>({
      query: () => `/0d9ec2e70191f0835e9a`,
    }),
  }),
});

export const { useGetWinesQuery } = apiSlice;
