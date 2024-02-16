import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.npoint.io",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWines: builder.query<ArrDataProps, void>({
      query: () => `/0d9ec2e70191f0835e9a`,
    }),
  }),
});

export const { useGetWinesQuery } = apiSlice;
