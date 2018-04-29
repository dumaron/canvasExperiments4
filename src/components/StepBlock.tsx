import * as React from 'react';
import { Card, Switch, Icon } from 'antd';
import { Step, STEP_TYPE } from '../definitions/steps';
import { Parameter, PARAMETER_TYPE } from '../definitions/parameters';
import { ImageParameterBlock } from './parameters/ImageParameterBlock';
import { IntegerParameterBlock } from './parameters/IntegerParameterBlock';
import { BooleanParameterBlock } from './parameters/BooleanParameterBlock';

interface Props {
	step: Step;
	setter: Function;
	enabler: Function;
	remover: Function;
	first?: boolean;
}

function switchParameterBlock(p: Parameter, setter: Function) {
	switch (p.type) {

		case PARAMETER_TYPE.IMAGE:
			return <ImageParameterBlock key={p.name} parameter={p} setter={setter}/>;

		case PARAMETER_TYPE.PERCENTAGE:
		case PARAMETER_TYPE.INTEGER:
			return <IntegerParameterBlock key={p.name} parameter={p} setter={setter}/>;

		case PARAMETER_TYPE.BOOLEAN:
			return <BooleanParameterBlock key={p.name} parameter={p} setter={setter}/>;

		default:
			return <div key={p.name}>{p.name} - {p.type}</div>;
	}
}

export class StepBlock extends React.Component<Props> {
	render() {
		const {step, setter, enabler, first, remover} = this.props;

		return (
			<Card
				title={STEP_TYPE[step.type]}
				extra={!first && <Switch checked={!step.disabled} onChange={() => enabler(!step.disabled)} />}
				actions={first ? undefined : [
					<Icon type="caret-up" key={1}/>,
					<Icon type="close" key={2} onClick={() => remover()}/>,
					<Icon type="caret-down" key={3}/>,
				]}
			>
				{step.parameters.map(p => switchParameterBlock(p, setter))}
			</Card>
		);
	}
}