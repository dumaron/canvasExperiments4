import * as React from 'react';
import { Form, Switch, Icon } from 'antd';
import { BooleanParameter } from '../../definitions/parameters';

interface Props {
	parameter: BooleanParameter;
	setter: Function;
}

export const BooleanParameterBlock = ({ parameter, setter }: Props) => {
	return (
		<Form.Item label={parameter.name}>
			<Switch
				checkedChildren={<Icon type="check" />}
				unCheckedChildren={<Icon type="cross" />}
				checked={parameter.value}
				onChange={() => setter(parameter.name, !parameter.value)}
			/>
		</Form.Item>
	);
};