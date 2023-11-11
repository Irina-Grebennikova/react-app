import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, useState } from 'react';

import { MockSearchPageContext } from '@/__mocks__/mock-search-page-context';
import { KEY_PREFIX } from '@/helpers';

import { Search } from './search';

jest.mock('@/pages/search-page', () => ({
  SearchPageContext: MockSearchPageContext,
}));

const getValueFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(`${KEY_PREFIX}-${key}`);
};

function SearchPageProvider({ children }: { children: ReactElement }): ReactElement {
  const [searchQuery, setSearchQuery] = useState(getValueFromLocalStorage('search-query') || '');

  return (
    <MockSearchPageContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        updateBreeds: jest.fn(),
        showBreedsFromFirstPage: jest.fn(),
      }}
    >
      {children}
    </MockSearchPageContext.Provider>
  );
}

describe('Search', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <SearchPageProvider>
        <Search />
      </SearchPageProvider>
    );
    const typedValue = 'pug';
    const input = screen.getByRole('textbox');
    const SearchButton = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, typedValue);
    await userEvent.click(SearchButton);

    const savedValue = getValueFromLocalStorage('search-query');

    expect(savedValue).toBe(typedValue);
  });

  it('component retrieves the value from the local storage upon mounting', () => {
    const searchQuery = 'labrador';
    localStorage.setItem(`${KEY_PREFIX}-search-query`, searchQuery);

    render(
      <SearchPageProvider>
        <Search />
      </SearchPageProvider>
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(searchQuery);
  });
});
