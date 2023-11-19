import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';

import { routes } from '@/router';

describe('NotFoundPage', () => {
  it('should render 404 page when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/some/bad/route']}>
        <Routes>{routes}</Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Sorry, the page you are looking for does not exist/i)).toBeInTheDocument();
  });
});
