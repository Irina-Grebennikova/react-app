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

const setValueToLocalStorage = (key: string, value: string): void => {
  return localStorage.setItem(`${KEY_PREFIX}-${key}`, value);
};

const user = userEvent.setup();

afterEach(() => {
  localStorage.clear();
});

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
        <Search updateBreeds={jest.fn()} showBreedsFromFirstPage={jest.fn()} />
      </SearchPageProvider>
    );
    const typedValue = 'pug';
    const input = screen.getByRole('textbox');
    const SearchButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, typedValue);
    await user.click(SearchButton);

    const savedValue = getValueFromLocalStorage('search-query');

    expect(savedValue).toBe(typedValue);
  });

  it('component retrieves the value from the local storage upon mounting', () => {
    const searchQuery = 'labrador';
    setValueToLocalStorage('search-query', searchQuery);

    render(
      <SearchPageProvider>
        <Search updateBreeds={jest.fn()} showBreedsFromFirstPage={jest.fn()} />
      </SearchPageProvider>
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(searchQuery);
  });

  it('clicking the clear button removes the value from the local storage and input', async () => {
    const searchQuery = 'rottweiler';
    setValueToLocalStorage('search-query', searchQuery);

    render(
      <SearchPageProvider>
        <Search updateBreeds={jest.fn()} showBreedsFromFirstPage={jest.fn()} />
      </SearchPageProvider>
    );

    const clearButton = screen.getByTestId('clear-button');
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(searchQuery);

    await user.click(clearButton);

    const valueInLS = getValueFromLocalStorage('search-query');

    expect(valueInLS).toBe(null);
    expect(input).toHaveValue('');
  });
});
