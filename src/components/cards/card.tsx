import { Component } from 'react';

import { baseUrl } from '@/api';
import { Breed } from '@/types';

import styles from './cards.module.scss';

type Props = {
  breed: Breed;
};

class Card extends Component<Props> {
  render(): JSX.Element {
    const { breed } = this.props;

    return (
      <div className={styles.card}>
        <img className={styles.image} src={`${baseUrl}/${breed.image}`} width={300} height={300} alt="" />
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

export default Card;
