import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { BREEDS_PER_PAGE, dogBreedsApi } from '@/api';
import { LocalStore } from '@/helpers';

import { RootState } from './store';

const initialState = {
  breedId: Number(LocalStore.getItem('breed-id')) || 0,
  breedsPerPage: BREEDS_PER_PAGE,
  searchQuery: LocalStore.getItem<string>('search-query') || '',
  currentPage: Number(LocalStore.getItem('current-page')) || 1,
  isDetailsOpen: false,
  isBreedsLoading: false,
  isDetailsLoading: false,
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
  extraReducers(builder) {
    const { getBreeds, getBreed } = dogBreedsApi.endpoints;

    builder
      .addMatcher(getBreeds.matchPending, (state) => {
        state.isBreedsLoading = true;
      })
      .addMatcher(isAnyOf(getBreeds.matchFulfilled, getBreeds.matchRejected), (state) => {
        state.isBreedsLoading = false;
      })
      .addMatcher(getBreed.matchPending, (state) => {
        state.isDetailsLoading = true;
      })
      .addMatcher(isAnyOf(getBreed.matchFulfilled, getBreed.matchRejected), (state) => {
        state.isDetailsLoading = false;
      });
  },
});

export const selectFromSearch = (state: RootState): RootState['search'] => state.search;

export const { reducer: searchReducer } = searchSlice;
export const { setBreedId, setBreedsPerPage, setSearchQuery, setCurrentPage, setIsDetailsOpen } = searchSlice.actions;
