import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Breed, BreedResponse } from '@/types';

const BASE_URL = 'https://api-dog-breeds.vercel.app';
const BREEDS_PER_PAGE = 12;

const getImageSrc = (pathToImage: string): string => `${BASE_URL}/${pathToImage}`;

type GetBreedsQueryArg = {
  query: string;
  page?: number;
  limit?: number;
};

const dogBreedsApiSlice = createApi({
  reducerPath: 'dogBreedsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getBreeds: builder.query<BreedResponse, GetBreedsQueryArg>({
      query: ({ query, page = 1, limit = BREEDS_PER_PAGE }) => ({
        url: '/api/catalog',
        params: {
          q: query,
          _limit: limit,
          _page: page,
        },
      }),
      transformResponse: (response: Breed[], meta) => ({
        results: response.map((item) => ({ ...item, image: getImageSrc(item.image) })),
        totalCount: Number(meta?.response?.headers?.get('X-Total-Count')) || 1,
      }),
    }),
    getBreed: builder.query<Breed, number>({
      query: (breedId) => `/api/catalog/${breedId}`,
      transformResponse: (response: Breed) => ({ ...response, image: getImageSrc(response.image) }),
    }),
  }),
});

export { BASE_URL, BREEDS_PER_PAGE, dogBreedsApiSlice };
export const { useGetBreedsQuery, useGetBreedQuery } = dogBreedsApiSlice;
