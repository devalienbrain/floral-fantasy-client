import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Product", "Category", "Payment"],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query({
      query: ({
        category,
        search,
        page = 1,
        limit = 12,
        sortBy = "name",
        sortOrder = "asc",
        addedToCart,
      }) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (addedToCart !== undefined)
          params.append("addedToCart", addedToCart.toString());
        return { url: "/products", params };
      },
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({ url: `/products/${id}` }),
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Categories
    getCategories: builder.query({
      query: () => ({ url: "/categories" }),
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // Payment-related endpoints
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),
    savePaymentInfo: builder.mutation({
      query: (data) => ({
        url: "/save-payment-info",
        method: "POST",
        body: data,
      }),
    }),
    getUsersWhoPaid: builder.query({
      query: () => ({ url: "/users-who-paid" }),
      providesTags: ["Payment"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/clear-cart",
        method: "POST",
      }),
      invalidatesTags: ["Product"], 
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreatePaymentIntentMutation,
  useSavePaymentInfoMutation,
  useGetUsersWhoPaidQuery,
  useClearCartMutation,
} = baseApi;
