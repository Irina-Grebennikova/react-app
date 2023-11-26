import { configureStore } from '@reduxjs/toolkit';

import { dogBreedsApi } from '@/api';

import { searchReducer } from './search-slice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    [dogBreedsApi.reducerPath]: dogBreedsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dogBreedsApi.middleware),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
