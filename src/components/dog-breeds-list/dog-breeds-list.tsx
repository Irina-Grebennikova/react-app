import { ReactNode } from 'react';

import noResultsIcon from '@/assets/icons/nothing-found.png';
import { Loader } from '@/components/loader';
import { Breed } from '@/types';

import { DogBreedsListItem } from './dog-breeds-list-item';
import styles from './dog-breeds-list.module.scss';

type DogBreedsListProps = {
  breeds: Breed[];
  isLoading: boolean;
};

function DogBreedsList({ breeds, isLoading }: DogBreedsListProps): ReactNode {
  if (isLoading) {
    return <Loader className={styles.loader} />;
  } else if (breeds.length === 0) {
    return (
      <div className={styles.noResults}>
        No results found
        <img className={styles.noResultsIcon} src={noResultsIcon} alt="" />
      </div>
    );
  }
  return (
    <div className={styles.cards}>
      {breeds.map((breed: Breed) => {
        return <DogBreedsListItem key={breed.id} breed={breed} />;
      })}
    </div>
  );
}

export { DogBreedsList };
