import { ReactElement } from 'react';

import { classNames } from '@/helpers';

import styles from './loader.module.scss';

function Loader({ className = '' }): ReactElement {
  return (
    <div className={classNames(styles.loader, className)}>
      <div className={styles.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export { Loader };
