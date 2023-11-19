import { ReactElement, ReactNode } from 'react';

import { classNames } from '@/helpers';

import styles from './button.module.scss';

type ButtonProps = {
  color?: 'red' | 'blue';
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  type?: 'submit' | 'button';
};

function Button(props: ButtonProps): ReactElement {
  const { color = 'blue', className = '', onClick, children, type = 'button' } = props;

  return (
    <button className={classNames(styles[`${color}Button`], className)} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export { Button };
