import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BREEDS_PER_PAGE } from '@/api';
import { LocalStore } from '@/helpers';

const initialState = {
  breedId: Number(LocalStore.getItem('breed-id')) || 0,
  breedsPerPage: BREEDS_PER_PAGE,
  searchQuery: LocalStore.getItem<string>('search-query') || '',
  currentPage: 0,
  isDetailsOpen: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setBreedId(state, action: PayloadAction<number>) {
      state.breedId = action.payload;
    },
    setBreedsPerPage(state, action: PayloadAction<number>) {
      state.breedsPerPage = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setIsDetailsOpen(state, action: PayloadAction<boolean>) {
      state.isDetailsOpen = action.payload;
    },
  },
});

export const { reducer: searchReducer } = searchSlice;
export const { setBreedId, setBreedsPerPage, setSearchQuery, setCurrentPage, setIsDetailsOpen } = searchSlice.actions;
