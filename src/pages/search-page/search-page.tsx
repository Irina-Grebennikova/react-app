import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { BREEDS_PER_PAGE, dogBreedsApi } from '@/api';
import { BreedsPerPageInput } from '@/components/breeds-per-page-input';
import { DogBreedsList } from '@/components/dog-breeds-list';
import { Search } from '@/components/search';
import { Button } from '@/components/ui';
import { Pagination } from '@/components/ui/pagination';
import { LocalStore, classNames } from '@/helpers';
import { Breed } from '@/types';

import { SearchPageContext } from './search-page-context';
import styles from './search-page.module.scss';

function SearchPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(LocalStore.getItem<string>('search-query') || '');
  const [breedsPerPage, setBreedsPerPage] = useState(BREEDS_PER_PAGE);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [breedId, setBreedId] = useState(Number(LocalStore.getItem('breed-id')) || 0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getClassForWrapper = (): string => classNames(styles.wrapper, isDetailsOpen ? styles.noScroll : '');

  const store = {
    breeds,
    breedId,
    searchQuery,
    currentPage,
    isDetailsOpen,
    setBreedId,
    setSearchQuery,
    setIsDetailsOpen,
    updateBreeds,
    showBreedsFromFirstPage,
  };

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

    setCurrentPage(newCurrentPage);
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
    setCurrentPage(page);
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
    setBreedsPerPage(newBreedsPerPage);
    showBreedsFromFirstPage(newBreedsPerPage);
  }

  function showBreedsFromFirstPage(itemsPerPage = breedsPerPage): void {
    setSearchParams({ page: '1' });
    if (currentPage === 1) {
      void updateBreeds(searchQuery.trim(), 1, itemsPerPage);
    }
  }

  return (
    <SearchPageContext.Provider value={store}>
      <div className={getClassForWrapper()}>
        <div className={styles.searchPage}>
          <header className={styles.header}>
            <BreedsPerPageInput
              breedsPerPage={breedsPerPage}
              totalCount={totalCount}
              handleChange={onBreedsPerPageChange}
            />
            <Button className={styles.errorBtn} color={'red'} onClick={(): void => setHasError(true)}>
              Error
            </Button>
          </header>
          <h1 className={styles.title}>Dog breeds</h1>
          <Search />
          <DogBreedsList isLoading={isLoading} />
          {!isLoading && breeds.length > 0 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
        </div>
        <Outlet />
      </div>
    </SearchPageContext.Provider>
  );
}

export { SearchPage };
