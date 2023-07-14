// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const contactApi = createApi({
  reducerPath: "contactApi",
  tagTypes: ["contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1/",
  }),
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (token) => ({
        url: `contact`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: (data, token) => ({
        url: 'contact',
        method: "POST",
        body: data,
        headers: { authorization: `Bearer ${token}` },
      }),
    }),
    
  }),
});
export const { useGetContactQuery, useCreateContactMutation } = contactApi;
