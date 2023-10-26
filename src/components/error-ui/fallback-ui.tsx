import { Component } from 'react';

import errorIcon from '@/assets/icons/caution.png';

import styles from './fallback-ui.module.scss';

class FallbackUI extends Component {
  render() {
    return (
      <section className={styles.fallbackUI}>
        <img className={styles.image} src={errorIcon} alt="" />
        <h2 className={styles.title}>OH Nooo...</h2>
        <p className={styles.message}>Sorry, something went wrong there.</p>
        <p className={styles.advice}>Try reloading the page to fix the problem.</p>
      </section>
    );
  }
}

export { FallbackUI };
