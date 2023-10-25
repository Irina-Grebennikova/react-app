import { Component } from 'react';

import noResultsIcon from '@/assets/icons/nothing-found.png';
import { Loader } from '@/components/loader';
import { Breed } from '@/types';

import Card from './card';
import styles from './cards.module.scss';

type Props = {
  breeds: Breed[];
  isLoading: boolean;
};

class Cards extends Component<Props> {
  render(): JSX.Element {
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
          return <Card key={breed.id} breed={breed} />;
        })}
      </div>
    );
  }
}

export default Cards;
