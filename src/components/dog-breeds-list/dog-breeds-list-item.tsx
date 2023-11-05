import { Component, ReactNode } from 'react';

import { dogBreedsApi } from '@/api/dog-breeds-api';
import { Breed } from '@/types';

import styles from './dog-breeds-list.module.scss';

type DogBreedsListItemProps = {
  breed: Breed;
};

class DogBreedsListItem extends Component<DogBreedsListItemProps> {
  render(): ReactNode {
    const { breed } = this.props;

    return (
      <div className={styles.card}>
        <img className={styles.image} src={dogBreedsApi.getImageSrc(breed.image)} width={300} height={300} alt="" />
        <div className={styles.description}>
          <h3 className={styles.nameInfo}>
            Breed: <span className={styles.name}>{breed.name}</span>
          </h3>
          <p className={styles.countryInfo}>
            Country: <span className={styles.country}>{breed.country}</span>
          </p>
        </div>
      </div>
    );
  }
}

export { DogBreedsListItem };
