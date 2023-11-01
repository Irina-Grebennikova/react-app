import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BREEDS_PER_PAGE, dogBreedsApi } from '@/api';
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
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (hasError) {
      throw new Error('Error button is clicked');
    }
  }, [hasError]);

  useEffect(() => {
    setSearchParams({ page: String(currentPage) });
    void updateBreeds(searchQuery.trim());
  }, [currentPage]);

  async function updateBreeds(query: string, page = currentPage): Promise<Breed[]> {
    setIsLoading(() => true);

    const breeds = await dogBreedsApi.getBreeds(query, page);

    setBreeds(breeds);
    setIsLoading(() => false);
    setCurrentPage(page);
    setPageCount(Math.ceil(dogBreedsApi.totalCount / BREEDS_PER_PAGE));

    return breeds;
  }

  return (
    <div className={styles.searchPage}>
      <header className={styles.header}>
        <Button className={styles.errorBtn} color={'red'} onClick={(): void => setHasError(true)}>
          Error
        </Button>
      </header>
      <h1 className={styles.title}>Dog breeds</h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} updateBreeds={updateBreeds} />
      <DogBreedsList breeds={breeds} isLoading={isLoading} />
      {!isLoading && breeds.length > 0 && (
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} />
      )}
    </div>
  );
}

export { SearchPage };
