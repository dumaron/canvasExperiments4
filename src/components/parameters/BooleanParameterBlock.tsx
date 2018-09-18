import * as React from 'react';
import { BooleanParameter } from '../../definitions/parameters';

interface Props {
	parameter: BooleanParameter;
	setter: Function;
}

export const BooleanParameterBlock = ({ parameter, setter }: Props) => {
	return (
		<input
			type="checkbox"
			checked={parameter.value}
			onChange={() => setter(parameter.name, !parameter.value)}
		/>
	);
};
