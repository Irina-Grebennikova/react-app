import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';

import { useGetBreedsQuery } from '@/api';
import { BreedsPerPageInput } from '@/components/breeds-per-page-input';
import { DogBreedsList } from '@/components/dog-breeds-list';
import { Search } from '@/components/search';
import { Button } from '@/components/ui';
import { Pagination } from '@/components/ui/pagination';
import { LocalStore, classNames } from '@/helpers';
import { selectFromSearch, setBreedsPerPage, setCurrentPage } from '@/store';

import styles from './search-page.module.scss';

function SearchPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  const [hasError, setHasError] = useState(false);

  const {
    breedsPerPage,
    searchQuery,
    currentPage,
    isDetailsOpen,
    isBreedsLoading: isLoading,
  } = useSelector(selectFromSearch);

  const { data: response } = useGetBreedsQuery({
    query: searchQuery,
    page: currentPage,
    limit: breedsPerPage,
  });

  const breeds = response?.results || [];
  const totalCount = response?.totalCount || 1;

  const pageCount = Math.ceil(totalCount / breedsPerPage);

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

    if (page === null) {
      page = LocalStore.getItem('current-page') || '1';

      id ? setSearchParams({ id, page }) : setSearchParams({ page });
    }
    dispatch(setCurrentPage(+page));
    LocalStore.setItem('current-page', +page);
  }, [searchParams]);

  function onBreedsPerPageChange({ target }: ChangeEvent<HTMLInputElement>): void {
    const { value, max, min } = target;
    if (+value < +min || +value > +max) {
      return;
    }
    dispatch(setBreedsPerPage(+value));
    setFirstPage();
  }

  const setFirstPage = (): void => setSearchParams({ page: '1' });

  return (
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
        <Search setFirstPage={setFirstPage} />
        {<DogBreedsList isLoading={isLoading} breeds={breeds} />}
        {!isLoading && breeds.length > 0 && <Pagination pageCount={pageCount} />}
      </div>
      <Outlet />
    </div>
  );
}

export { SearchPage };
