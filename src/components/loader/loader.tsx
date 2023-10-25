import { classNames } from '@/helpers';

import styles from './loader.module.scss';

function Loader({ className = '' }): JSX.Element {
  return (
    <div className={classNames(styles.loader, className)}>
      <div className={styles['lds-ripple']}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export { Loader };
