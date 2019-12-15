import * as React from 'react';
import { claraThemeType } from '../../utils/theme';
import { registerClass } from '../../utils/css-manager';

interface ButtonProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const buttonClass = registerClass(
	(t: claraThemeType) => `
  padding-left: ${t.basePadding}rem;
  padding-right: ${t.basePadding}rem;
  padding-top: ${t.basePadding * t.ratios.s}rem;
  padding-bottom: ${t.basePadding * t.ratios.s}rem;
  background-color: transparent;
  border: 1px solid ${t.activeColor};
  color: ${t.ink};
  font-family: "Exo", sans-serif;
`,
);

export const Button: React.SFC<ButtonProps> = ({ children, onClick }) => (
	<button className={buttonClass} onClick={onClick}>
		{children}
	</button>
);
