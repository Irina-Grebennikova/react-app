import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import dogImage from '@/assets/images/puppy.jpg';
import { Button } from '@/components/ui';

import styles from './not-found-page.module.scss';

function NotFoundPage(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.error}>
        4
        <img className={styles.image} src={dogImage} alt="" />4
      </div>
      <p className={styles.text}>Sorry, the page you are looking for does not exist.</p>
      <Link to={'/'}>
        <Button className={styles.button}>Back to search</Button>
      </Link>
    </div>
  );
}

export { NotFoundPage };
