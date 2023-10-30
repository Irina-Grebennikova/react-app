import { Component, ReactNode } from 'react';

import { classNames } from '@/helpers';

import styles from './button.module.scss';

type ButtonProps = {
  color?: 'red' | 'blue';
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
};

class Button extends Component<ButtonProps> {
  render(): ReactNode {
    const { color = 'blue', className = '', onClick, children } = this.props;

    return (
      <button className={classNames(styles[`${color}Button`], className)} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export { Button };
