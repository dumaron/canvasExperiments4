import * as React from 'react';
import { Step, STEP_TYPE } from '../definitions/steps';
import { Parameter, PARAMETER_TYPE } from '../definitions/parameters';
import { ImageParameterBlock } from './parameters/ImageParameterBlock';
import { IntegerParameterBlock } from './parameters/IntegerParameterBlock';
import { BooleanParameterBlock } from './parameters/BooleanParameterBlock';

interface StepBlockProps {
	step: Step;
	setter: (value: any) => void;
	enabler: Function;
	remover: Function;
	first?: boolean;
}

interface StepBlockState {
	expanded: boolean;
}

function switchParameterBlock(p: Parameter, setter: Function) {
	switch (p.type) {
		case PARAMETER_TYPE.IMAGE:
			return <ImageParameterBlock key={p.name} parameter={p} setter={setter} />;

		case PARAMETER_TYPE.PERCENTAGE:
		case PARAMETER_TYPE.INTEGER:
			return <IntegerParameterBlock key={p.name} parameter={p} setter={setter} />;

		case PARAMETER_TYPE.BOOLEAN:
			return <BooleanParameterBlock key={p.name} parameter={p} setter={setter} />;

		default:
			return (
				<div key={p.name}>
					{p.name} - {p.type}
				</div>
			);
	}
}

export class StepBlock extends React.Component<StepBlockProps, StepBlockState> {
	constructor(props: StepBlockProps) {
		super(props);

		this.state = {
			expanded: false,
		};
	}

	render() {
		const { step, setter } = this.props;

		return (
			<div>
				{STEP_TYPE[step.type]}
				{step.parameters.map((p) => switchParameterBlock(p, setter))}
			</div>
		);
	}
}
