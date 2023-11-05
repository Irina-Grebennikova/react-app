import { Component, ReactNode } from 'react';

import noResultsIcon from '@/assets/icons/nothing-found.png';
import { Loader } from '@/components/loader';
import { Breed } from '@/types';

import { DogBreedsListItem } from './dog-breeds-list-item';
import styles from './dog-breeds-list.module.scss';

type DogBreedsListProps = {
  breeds: Breed[];
  isLoading: boolean;
};

class DogBreedsList extends Component<DogBreedsListProps> {
  render(): ReactNode {
    if (this.props.isLoading) {
      return <Loader className={styles.loader} />;
    } else if (this.props.breeds.length === 0) {
      return (
        <div className={styles.noResults}>
          No results found
          <img className={styles.noResultsIcon} src={noResultsIcon} alt="" />
        </div>
      );
    }
    return (
      <div className={styles.cards}>
        {this.props.breeds.map((breed: Breed) => {
          return <DogBreedsListItem key={breed.id} breed={breed} />;
        })}
      </div>
    );
  }
}

export { DogBreedsList };
