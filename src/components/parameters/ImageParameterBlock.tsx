import * as React from 'react';
import { ImageParameter } from '../../definitions/parameters';

interface Props {
	parameter: ImageParameter;
	setter: Function;
}

export const ImageParameterBlock = ({ parameter, setter }: Props) => (
	<input
		type="file"
		onChange={(e) => setter(parameter.name, e.target.files ? e.target.files[0] : null)}
	/>
);
