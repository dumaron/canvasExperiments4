import * as React from 'react';
import {
	IntegerParameter,
	parametersData,
	PercentageParameter,
} from '../../definitions/parameters';

interface IntegerParameterBlockProps {
	parameter: IntegerParameter | PercentageParameter;
	setter: Function;
}

export const IntegerParameterBlock = ({ parameter, setter }: IntegerParameterBlockProps) => {
	const { min, max } = parametersData[parameter.type];

	return (
		<input
			type="number"
			value={parameter.value}
			min={min}
			max={max}
			onChange={(event) => setter(parameter.name, event.target.value)}
		/>
	);
};
