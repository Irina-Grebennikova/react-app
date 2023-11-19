import { createContext } from 'react';

type SearchPageContextType = {
  breedId: number;
  currentPage: number;
  isDetailsOpen: boolean;
  setBreedId: React.Dispatch<React.SetStateAction<number>>;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchPageContext = createContext<SearchPageContextType>({
  breedId: 0,
  currentPage: 0,
  isDetailsOpen: false,
  setBreedId: () => {},
  setIsDetailsOpen: () => {},
});

export { SearchPageContext };
