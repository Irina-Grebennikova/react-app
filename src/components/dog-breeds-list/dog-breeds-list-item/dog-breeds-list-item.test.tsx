import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockApiData } from '@/__mocks__/mock-api-data';
import { App } from '@/app';
import { store } from '@/store';

import { DogBreedsListItem } from './dog-breeds-list-item';

fetchMock.mockResponse(JSON.stringify(mockApiData));

describe('DogBreedsListItem', () => {
  it('renders the relevant data', () => {
    const breedInfo = mockApiData[0];

    render(
      <BrowserRouter>
        <Provider store={store}>
          <DogBreedsListItem breed={breedInfo} />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(breedInfo.name)).toBeInTheDocument();
    expect(screen.getByText(breedInfo.country)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', breedInfo.image);
  });

  it('clicking on a card triggers an additional API call to fetch detailed information', async () => {
    const breedInfo = mockApiData[0];
    
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const card = await screen.findByTestId(`card-${breedInfo.id}`);

    await userEvent.click(card);

    expect(fetchMock).toHaveBeenCalled();
  });
});
