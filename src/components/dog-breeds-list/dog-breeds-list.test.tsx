import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';

import { mockApiData } from '@/__mocks__/mock-api-data';

import { DogBreedsList } from './dog-breeds-list';

jest.mock('./dog-breeds-list-item/dog-breeds-list-item', () => ({
  DogBreedsListItem: (): ReactElement => <a href="" />,
}));

describe('DogBreedsList', () => {
  it('renders the specified number of cards', () => {
    render(<DogBreedsList isLoading={false} breeds={mockApiData} />);

    const cards = screen.getAllByRole('link');

    expect(cards).toHaveLength(mockApiData.length);
  });

  it('appropriate message is displayed if no cards are present', () => {
    render(<DogBreedsList isLoading={false} breeds={[]} />);

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });
});
