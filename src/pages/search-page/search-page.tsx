import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';

import { dogBreedsApi } from '@/api';
import { BreedsPerPageInput } from '@/components/breeds-per-page-input';
import { DogBreedsList } from '@/components/dog-breeds-list';
import { Search } from '@/components/search';
import { Button } from '@/components/ui';
import { Pagination } from '@/components/ui/pagination';
import { LocalStore, classNames } from '@/helpers';
import { setBreedsPerPage, setCurrentPage } from '@/redux/searchSlice';
import { RootState } from '@/redux/store';
import { Breed } from '@/types';

import { SearchPageContext } from './search-page-context';
import styles from './search-page.module.scss';

function SearchPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const { breedsPerPage, searchQuery, currentPage, isDetailsOpen } = useSelector((state: RootState) => state.search);

  const getClassForWrapper = (): string => classNames(styles.wrapper, isDetailsOpen ? styles.noScroll : '');

  const dispatch = useDispatch();

  useEffect(() => {
    if (hasError) {
      throw new Error('Error button is clicked');
    }
  }, [hasError]);

  useEffect(() => {
    const id = searchParams.get('id');
    let page = searchParams.get('page');

    if (page === null || +page === 0) {
      page = LocalStore.getItem('current-page') || '1';
      if (id) {
        setSearchParams({ id, page });
      } else {
        setSearchParams({ page });
      }
    }
    const newCurrentPage = Number(page) || 1;

    dispatch(setCurrentPage(newCurrentPage));
    LocalStore.setItem('current-page', newCurrentPage);
    void updateBreeds(searchQuery.trim(), newCurrentPage);
  }, [searchParams]);

  async function updateBreeds(query: string, page = currentPage, itemsPerPage = breedsPerPage): Promise<Breed[]> {
    setIsLoading(() => true);

    const response = await dogBreedsApi.getBreeds(query, page, itemsPerPage);
    const breeds = response?.results || [];
    const nextTotalCount = response?.totalCount || 0;

    setBreeds(breeds);
    setIsLoading(() => false);
    dispatch(setCurrentPage(page));
    setTotalCount(nextTotalCount);
    setPageCount(Math.ceil(nextTotalCount / itemsPerPage));

    return breeds;
  }

  function onBreedsPerPageChange({ target }: ChangeEvent<HTMLInputElement>): void {
    const { value, max, min } = target;
    if (+value < +min || +value > +max) {
      return;
    }
    const newBreedsPerPage = +value;
    dispatch(setBreedsPerPage(newBreedsPerPage));
    showBreedsFromFirstPage(newBreedsPerPage);
  }

  function showBreedsFromFirstPage(itemsPerPage = breedsPerPage): void {
    setSearchParams({ page: '1' });
    if (currentPage === 1) {
      void updateBreeds(searchQuery.trim(), 1, itemsPerPage);
    }
  }

  return (
    <SearchPageContext.Provider value={{ breeds }}>
      <div className={getClassForWrapper()}>
        <div className={styles.searchPage}>
          <header className={styles.header}>
            <BreedsPerPageInput totalCount={totalCount} handleChange={onBreedsPerPageChange} />
            <Button className={styles.errorBtn} color={'red'} onClick={(): void => setHasError(true)}>
              Error
            </Button>
          </header>
          <h1 className={styles.title}>Dog breeds</h1>
          <Search updateBreeds={updateBreeds} showBreedsFromFirstPage={showBreedsFromFirstPage} />
          <DogBreedsList isLoading={isLoading} />
          {!isLoading && breeds.length > 0 && <Pagination pageCount={pageCount} />}
        </div>
        <Outlet />
      </div>
    </SearchPageContext.Provider>
  );
}

export { SearchPage };
