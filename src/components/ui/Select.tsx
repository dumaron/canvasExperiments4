import * as React from 'react';

export type selectValue = number | string;

export interface choice {
	label: string;
	value: selectValue;
}

interface SelectProps {
	choices: choice[];
	selected?: selectValue;
	onChange: (value: selectValue) => void;
}

export const Select: React.SFC<SelectProps> = ({ choices, selected, onChange }) => (
	<select value={selected} onClick={(e) => onChange((e.target as HTMLSelectElement).value)}>
		{choices.map(({ label, value }) => (
			<option key={value} value={value}>
				{label}
			</option>
		))}
	</select>
);
