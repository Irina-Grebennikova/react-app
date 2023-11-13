import { createContext } from 'react';

import { Breed } from '@/types';

type SearchPageContextType = {
  breeds: Breed[];
};

const SearchPageContext = createContext<SearchPageContextType>({
  breeds: [],
});

export { SearchPageContext };
