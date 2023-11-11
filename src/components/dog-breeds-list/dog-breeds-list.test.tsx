import { render, screen } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mockApiData } from '@/__mocks__/mock-api-data';
import { MockSearchPageContext } from '@/__mocks__/mock-search-page-context';
import { Breed } from '@/types';

import { DogBreedsList } from './dog-breeds-list';

jest.mock('@/pages/search-page', () => ({
  SearchPageContext: MockSearchPageContext,
}));

type SearchPageProviderProps = {
  breeds: Breed[];
  children: ReactNode;
};

function SearchPageProvider({ breeds, children }: SearchPageProviderProps): ReactElement {
  return (
    <MockSearchPageContext.Provider
      value={{
        breeds,
      }}
    >
      {children}
    </MockSearchPageContext.Provider>
  );
}

describe('DogBreedsList', () => {
  it('renders the specified number of cards', () => {
    render(
      <BrowserRouter>
        <SearchPageProvider breeds={mockApiData}>
          <DogBreedsList isLoading={false} />
        </SearchPageProvider>
      </BrowserRouter>
    );

    const cards = screen.getAllByRole('link');

    expect(cards).toHaveLength(mockApiData.length);
  });

  it('appropriate message is displayed if no cards are present', () => {
    render(
      <BrowserRouter>
        <SearchPageProvider breeds={[]}>
          <DogBreedsList isLoading={false} />
        </SearchPageProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
