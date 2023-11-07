import { ReactElement, ReactNode } from 'react';

import { classNames } from '@/helpers';

import styles from './button.module.scss';

type ButtonProps = {
  color?: 'red' | 'blue';
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
};

function Button(props: ButtonProps): ReactElement {
  const { color = 'blue', className = '', onClick, children } = props;

  return (
    <button className={classNames(styles[`${color}Button`], className)} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
