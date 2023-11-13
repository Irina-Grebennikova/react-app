import { configureStore } from '@reduxjs/toolkit';

import { dogBreedsApiSlice } from '@/api';

import { searchReducer } from './search-slice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    [dogBreedsApiSlice.reducerPath]: dogBreedsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dogBreedsApiSlice.middleware),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
