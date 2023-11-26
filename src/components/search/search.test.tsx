import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { KEY_PREFIX } from '@/helpers';
import { store } from '@/store';

import { Search } from './search';

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

describe('Search', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={store}>
        <Search setFirstPage={jest.fn()} />
      </Provider>
    );
    const typedValue = 'pug';
    const input = screen.getByRole('textbox');
    const SearchButton = screen.getByRole('button', { name: /search/i });

    await user.type(input, typedValue);
    await user.click(SearchButton);

    const savedValue = getValueFromLocalStorage('search-query');

    expect(savedValue).toBe(typedValue);
  }, 10000);

  it('clicking the clear button removes the value from the local storage and input', async () => {
    const searchQuery = 'rottweiler';
    setValueToLocalStorage('search-query', searchQuery);

    render(
      <Provider store={store}>
        <Search setFirstPage={jest.fn()} />
      </Provider>
    );

    const clearButton = screen.getByTestId('clear-button');
    const input = screen.getByRole('textbox');

    await user.click(clearButton);

    const valueInLS = getValueFromLocalStorage('search-query');

    expect(valueInLS).toBe(null);
    expect(input).toHaveValue('');
  }, 10000);
});
