import * as React from 'react';
import { Form, Slider } from 'antd';
import { IntegerParameter, parametersData, PercentageParameter } from '../../definitions/parameters';

interface Props {
	parameter: IntegerParameter | PercentageParameter;
	setter: Function;
}

export const IntegerParameterBlock = ({ parameter, setter }: Props) => {
	const { min, max } = parametersData[ parameter.type ];

	return (
		<Form.Item
			label={parameter.name}
		>
			<Slider
				value={parameter.value}
				min={min}
				max={max}
				onChange={value => setter(parameter.name, value)}
			/>
		</Form.Item>
	);
};