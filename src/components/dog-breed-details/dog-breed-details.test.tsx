import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';

import { mockApiData } from '@/__mocks__/mock-api-data';
import { store } from '@/store';

import { DogBreedDetails } from './dog-breed-details';

fetchMock.mockResponse(JSON.stringify(mockApiData[0]));

describe('DogBreedDetails', () => {
  it('loading indicator is displayed while fetching data', async () => {
    render(
      <Provider store={store}>
        <DogBreedDetails />
      </Provider>
    );

    const loader = screen.getByRole('status');

    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
  });

  it('component correctly displays the detailed card data', async () => {
    const breedInfo = mockApiData[0];

    render(
      <Provider store={store}>
        <DogBreedDetails />
      </Provider>
    );

    expect(await screen.findByText(breedInfo.name)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.country)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.height)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.weight)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.wool)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.color)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.group)).toBeInTheDocument();
  });
});
