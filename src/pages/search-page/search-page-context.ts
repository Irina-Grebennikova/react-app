import { Dispatch, createContext } from 'react';

import { Breed } from '@/types';

type SearchPageContextType = {
  breeds: Breed[];
  breedId: number;
  searchQuery: string;
  currentPage: number;
  isDetailsOpen: boolean;
  setBreedId: Dispatch<React.SetStateAction<number>>;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  setIsDetailsOpen: Dispatch<React.SetStateAction<boolean>>;
  updateBreeds: (query: string, page?: number) => Promise<Breed[]>;
  showBreedsFromFirstPage: () => void;
};

const SearchPageContext = createContext<SearchPageContextType>({
  breeds: [],
  breedId: 0,
  searchQuery: '',
  currentPage: 0,
  isDetailsOpen: false,
  setBreedId: () => {},
  setSearchQuery: () => {},
  setIsDetailsOpen: () => {},
  updateBreeds: () => Promise.resolve([]),
  showBreedsFromFirstPage: () => {},
});

export { SearchPageContext };
