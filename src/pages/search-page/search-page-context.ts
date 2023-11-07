import { Dispatch, createContext } from 'react';

import { Breed } from '@/types';

type SearchPageContextType = {
  breeds: Breed[];
  breedId: number;
  searchQuery: string;
  currentPage: number;
  isDetailsOpen: boolean;
  setBreedId: Dispatch<React.SetStateAction<number>>;
  setIsDetailsOpen: Dispatch<React.SetStateAction<boolean>>;
};

const SearchPageContext = createContext<SearchPageContextType>({
  breeds: [],
  breedId: 0,
  searchQuery: '',
  currentPage: 0,
  isDetailsOpen: false,
  setBreedId: () => {},
  setIsDetailsOpen: () => {},
});

export { SearchPageContext };
