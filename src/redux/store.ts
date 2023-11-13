import { configureStore } from '@reduxjs/toolkit';

import { searchReducer } from './searchSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
