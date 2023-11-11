import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { Pagination } from './pagination';

describe('Pagination', () => {
  it('component updates URL query parameter when page changes', async () => {
    const lastPage = 5;
    const currentPage = 3;
    const searchParam = '?page';

    render(
      <BrowserRouter>
        <Pagination currentPage={currentPage} pageCount={lastPage} />
      </BrowserRouter>
    );

    const LinkToFirstPage = screen.getByText('<<');
    const LinkToPrevPage = screen.getByText('<');
    const LinkToNextPage = screen.getByText('>');
    const LinkToLastPage = screen.getByText('>>');

    const user = userEvent.setup();

    await user.click(LinkToPrevPage);
    expect(window.location.search).toBe(`${searchParam}=${currentPage - 1}`);

    await user.click(LinkToFirstPage);
    expect(window.location.search).toBe(`${searchParam}=1`);

    await user.click(LinkToNextPage);
    expect(window.location.search).toBe(`${searchParam}=${currentPage + 1}`);

    await user.click(LinkToLastPage);
    expect(window.location.search).toBe(`${searchParam}=${lastPage}`);
  });
});
