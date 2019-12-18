import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Step } from '../definitions/steps';
import { StepBlock } from './StepBlock';

interface Props {
	steps: Step[];
	setter: Function;
	enabler: Function;
	remover: Function;
	changeOrder: (...args: any[]) => void;
}

function bindToIndex(f: Function, i: number) {
	return (...args: any[]) => f(i, ...args);
}

const SortableItem = SortableElement(({ children }) => children);

const StepListBase = SortableContainer(({ steps, setter, enabler, remover }: Props) => (
	<div>
		{steps.map((step, i) => (
			<SortableItem key={i} index={i}>
				<StepBlock
					step={step}
					setter={bindToIndex(setter, i)}
					enabler={bindToIndex(enabler, i)}
					remover={bindToIndex(remover, i)}
				/>
			</SortableItem>
		))}
	</div>
));

export class StepList extends React.Component<Props, {}> {
	render() {
		const { changeOrder } = this.props;
		return <StepListBase {...this.props} onSortEnd={changeOrder} />;
	}
}
