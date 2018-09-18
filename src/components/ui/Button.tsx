import * as React from 'react';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button : React.SFC<ButtonProps> = ({children, onClick}) => (
  <button onClick={onClick}>{children}</button>
);