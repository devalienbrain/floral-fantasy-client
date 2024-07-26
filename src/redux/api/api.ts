import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, search, page, limit, sortBy, sortOrder }) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        if (sortBy) params.append('sortBy', sortBy);
        if (sortOrder) params.append('sortOrder', sortOrder);
        return { url: '/products', params };
      },
      providesTags: ['Product']
    }),
    
    getProductById: builder.query({
      query: (id) => ({ url: `/products/${id}` }),
      providesTags: ['Product']
    }),
    addProduct: builder.mutation({
      
      query: (data) => ({
        
        
        url: '/products',
        method: 'POST',
        body: data,
      }),
      
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product']
    }),

    // Categories
    getCategories: builder.query({
      query: () => ({ url: '/categories' }),
      providesTags: ['Category']
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category']
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Category']
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category']
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
} = baseApi;

