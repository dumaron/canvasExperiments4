import * as React from 'react';
import { Row, Col, Button } from 'antd';
import { generateStep, Step, STEP_TYPE } from '../definitions/steps';
import { StepList } from './StepList';
import { runSequence } from '../utils/engine';

interface Props {}

interface State {
	steps: Step[];
}

export class Editor extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			steps: [
				generateStep(STEP_TYPE.LOAD_IMAGE),
				generateStep(STEP_TYPE.FILTER_1),
			]
		};
	}

	setter = (index: number, parameterName: string, value: any) => {
		const {steps} = this.state;
		const newSteps = steps.map((step, i) => {
			if (i === index) {

				// maybe use a more functional approach?
				const parameter = step.parameters.find(p => p.name === parameterName);
				if (parameter) {
					parameter.value = value;
				}

			}
			return step;
		});

		this.setState({ steps: newSteps });
	}

	enabler = (index: number, disabled: boolean) => {
		const {steps} = this.state;
		const newSteps = steps.map((step, i) => {
			if (i === index) {
				step.disabled = disabled;
			}

			return step;
		});

		this.setState({ steps: newSteps });
	}

	generate = () => {
		const c = document.getElementById('canvas') as HTMLCanvasElement;
		runSequence(c, this.state.steps);
	}

	render() {
		const { steps } = this.state;

		return (
			<div id="editor">
				<Row>
					<Col span={5}>
						<StepList steps={steps} setter={this.setter} enabler={this.enabler} />
						<Button type={'primary'} icon={'setting'} onClick={() => this.generate()}>Generate</Button>
					</Col>
					<Col span={19}>
						<canvas id="canvas" />
					</Col>
				</Row>
			</div>
		);
	}
}