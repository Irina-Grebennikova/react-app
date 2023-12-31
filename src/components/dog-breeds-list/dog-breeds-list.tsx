import { ReactElement } from 'react';

import noResultsIcon from '@/assets/icons/nothing-found.png';
import { Loader } from '@/components/ui';
import { Breed } from '@/types';

import { DogBreedsListItem } from './dog-breeds-list-item/dog-breeds-list-item';
import styles from './dog-breeds-list.module.scss';

type DogBreedsListProps = {
  breeds: Breed[];
  isLoading: boolean;
};

function DogBreedsList({ breeds, isLoading }: DogBreedsListProps): ReactElement {
  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  if (breeds.length === 0) {
    return (
      <div className={styles.noResults}>
        No results found
        <img src={noResultsIcon} alt="" />
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
