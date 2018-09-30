import React from 'react';
import { Step, STEP_TYPE } from '../definitions/steps';
import { Parameter, PARAMETER_TYPE } from '../definitions/parameters';
import { ImageParameterBlock } from './parameters/ImageParameterBlock';
import { IntegerParameterBlock } from './parameters/IntegerParameterBlock';
import { BooleanParameterBlock } from './parameters/BooleanParameterBlock';
import { claraThemeType } from '../utils/theme';
import { registerClass } from '../utils/css-manager';
import { Button } from './ui/Button';

interface StepBlockProps {
	step: Step;
	setter: (value: any) => void;
	enabler: (enable: boolean) => void;
	remover: () => void;
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

const stepBlockClass = registerClass(
	(t: claraThemeType) => `
  padding: ${t.basePadding}rem;
  margin: ${t.basePadding * t.ratios.s}rem;
  background-color: ${t.blockColor};
  border: 1px solid ${t.activeColor};
  user-select: none;
`,
);

export class StepBlock extends React.Component<StepBlockProps, StepBlockState> {
	constructor(props: StepBlockProps) {
		super(props);

		this.state = {
			expanded: false,
		};
	}

	render() {
		const { step, setter, remover, enabler } = this.props;
		const { disabled } = step;

		return (
			<div className={stepBlockClass}>
				{STEP_TYPE[step.type]}
				{step.parameters.map((p) => switchParameterBlock(p, setter))}
				<div>
					<Button onClick={remover}>Remove</Button>
					<Button onClick={() => enabler(!disabled)}>{disabled ? 'Enable' : 'Disable'}</Button>
				</div>
			</div>
		);
	}
}
