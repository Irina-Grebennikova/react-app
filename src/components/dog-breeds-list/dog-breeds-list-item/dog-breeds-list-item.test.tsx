import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { mockApiData } from '@/__mocks__/mock-api-data';
import { BASE_URL } from '@/api';
import { App } from '@/app';

import { DogBreedsListItem } from './dog-breeds-list-item';

global.fetch = jest.fn(async () => Promise.resolve({ json: async () => Promise.resolve(mockApiData) })) as jest.Mock;
const user = userEvent.setup();

describe('DogBreedsListItem', () => {
  it('renders the relevant data', () => {
    const breedInfo = mockApiData[0];

    render(
      <BrowserRouter>
        <DogBreedsListItem breed={breedInfo} />
      </BrowserRouter>
    );

    expect(screen.getByText(breedInfo.name)).toBeInTheDocument();
    expect(screen.getByText(breedInfo.country)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', breedInfo.image);
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(<App />);
    const breedInfo = mockApiData[0];
    const card = await screen.findByTestId(`card-${breedInfo.id}`);

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();

    await user.click(card);

    expect(await screen.findByRole('complementary')).toBeInTheDocument();
  });

  it('clicking on a card triggers an additional API call to fetch detailed information', async () => {
    render(<App />);
    const breedInfo = mockApiData[0];
    const card = await screen.findByTestId(`card-${breedInfo.id}`);

    await user.click(card);

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/catalog/${breedInfo.id}`);
  });
});
