import React from 'react';
import { Step } from '../definitions/steps';
import { StepBlock } from './StepBlock';

interface Props {
	steps: Step[];
	setter: Function;
	enabler: Function;
	remover: Function;
}

function bindToIndex(f: Function, i: number) {
	return (...args: any[]) => f(i, ...args);
}

export const StepList = (props: Props) => (
	<div className="step-list">
		{props.steps.map((step, i) => (
			<div key={i} className={'step'}>
				<StepBlock
					step={step}
					setter={bindToIndex(props.setter, i)}
					enabler={bindToIndex(props.enabler, i)}
					remover={bindToIndex(props.remover, i)}
					first={i === 0}
				/>
			</div>
		))}
	</div>
);
