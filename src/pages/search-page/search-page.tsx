import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BREEDS_PER_PAGE, dogBreedsApi } from '@/api';
import { BreedsPerPageInput } from '@/components/breeds-per-page-input';
import { DogBreedsList } from '@/components/dog-breeds-list';
import { Search } from '@/components/search';
import { Button } from '@/components/ui';
import { Pagination } from '@/components/ui/pagination';
import { LocalStore } from '@/helpers';
import { Breed } from '@/types';

import styles from './search-page.module.scss';

function SearchPage(): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(LocalStore.getItem<string>('search-query') || '');
  const [breedsPerPage, setBreedsPerPage] = useState(BREEDS_PER_PAGE);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (hasError) {
      throw new Error('Error button is clicked');
    }
  }, [hasError]);

  useEffect(() => {
    const page = searchParams.get('page');

    if (page === null) {
      setSearchParams({ page: '1' });
    }
    const newCurrentPage = Number(page) || 1;

    setCurrentPage(newCurrentPage);
    void updateBreeds(searchQuery.trim(), newCurrentPage);
  }, [searchParams]);

  async function updateBreeds(query: string, page = currentPage, itemsPerPage = breedsPerPage): Promise<Breed[]> {
    setIsLoading(() => true);

    const breeds = await dogBreedsApi.getBreeds(query, page, itemsPerPage);

    setBreeds(breeds);
    setIsLoading(() => false);
    setCurrentPage(page);
    setPageCount(Math.ceil(dogBreedsApi.totalCount / itemsPerPage));

    return breeds;
  }

  function onBreedsPerPageChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    if (+value < 1 || +value > dogBreedsApi.totalCount) {
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
    <div className={styles.searchPage}>
      <header className={styles.header}>
        <BreedsPerPageInput
          breedsPerPage={breedsPerPage}
          totalCount={dogBreedsApi.totalCount}
          handleChange={onBreedsPerPageChange}
        />
        <Button className={styles.errorBtn} color={'red'} onClick={(): void => setHasError(true)}>
          Error
        </Button>
      </header>
      <h1 className={styles.title}>Dog breeds</h1>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        updateBreeds={updateBreeds}
        showBreedsFromFirstPage={showBreedsFromFirstPage}
      />
      <DogBreedsList breeds={breeds} isLoading={isLoading} />
      {!isLoading && breeds.length > 0 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
    </div>
  );
}

export { SearchPage };
