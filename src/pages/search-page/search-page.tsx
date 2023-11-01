import { ReactNode, useEffect, useState } from 'react';

import { dogBreedsApi } from '@/api';
import { DogBreedsList } from '@/components/dog-breeds-list';
import { Search } from '@/components/search';
import { Button } from '@/components/ui';
import { Breed } from '@/types';

import styles from './search-page.module.scss';

function SearchPage(): ReactNode {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      throw new Error('Error button is clicked');
    }
  }, [hasError]);

  async function updateBreeds(query: string): Promise<Breed[]> {
    setIsLoading(() => true);

    const breeds = await dogBreedsApi.getBreeds(query);

    setBreeds(breeds);
    setIsLoading(() => false);

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
      <Search updateBreeds={updateBreeds} />
      <DogBreedsList breeds={breeds} isLoading={isLoading} />
    </div>
  );
}

export { SearchPage };
