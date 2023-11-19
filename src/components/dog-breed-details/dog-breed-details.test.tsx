import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes } from 'react-router-dom';

import { mockApiData } from '@/__mocks__/mock-api-data';
import { routes } from '@/router';

import { DogBreedDetails } from './dog-breed-details';

global.fetch = jest.fn(async () => Promise.resolve({ json: async () => Promise.resolve(mockApiData[0]) })) as jest.Mock;

describe('DogBreedDetails', () => {
  it('loading indicator is displayed while fetching data', async () => {
    render(<DogBreedDetails />);

    const loader = screen.getByRole('status');

    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
  });

  it('component correctly displays the detailed card data', async () => {
    render(<DogBreedDetails />);

    const breedInfo = mockApiData[0];

    expect(await screen.findByText(breedInfo.name)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.country)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.height)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.weight)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.wool)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.color)).toBeInTheDocument();
    expect(await screen.findByText(breedInfo.group)).toBeInTheDocument();
  });

  it('clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/details']}>
        <Routes>{routes}</Routes>
      </MemoryRouter>
    );

    const details = await screen.findByRole('complementary');
    expect(details).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: '' });
    await userEvent.click(closeButton);

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });
});
