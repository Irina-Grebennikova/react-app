import { ReactNode } from 'react';

import { classNames } from '@/helpers';

import styles from './loader.module.scss';

function Loader({ className = '' }): ReactNode {
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
