import * as React from 'react';
import { Row, Col, Button, Modal, Select } from 'antd';
import { generateStep, Step, STEP_TYPE } from '../definitions/steps';
import { StepList } from './StepList';
import { runSequence } from '../utils/engine';

const Option = Select.Option;

interface Props {
}

interface State {
	steps: Step[];
	addStepModalOpen: boolean;
	addStepSelectValue: STEP_TYPE;
}

export class Editor extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);

		this.state = {
			steps: [
				generateStep(STEP_TYPE.LOAD_IMAGE),
				generateStep(STEP_TYPE.GRAYSCALE_1),
			],
			addStepModalOpen: false,
			addStepSelectValue: STEP_TYPE.GRAYSCALE_1
		};
	}

	setter = (index: number, parameterName: string, value: any) => {
		const { steps } = this.state;
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
		const { steps } = this.state;
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

	addStep = () => {
		const {steps, addStepSelectValue} = this.state;
		this.setState({
			steps: steps.concat([ generateStep(addStepSelectValue)]),
			addStepModalOpen: false,
		});
	}

	removeStep = (index: number) => {
		const {steps} = this.state;
		this.setState({
			steps: steps.filter((e, i) => i !== index)
		});
	}

	render() {
		const { steps, addStepModalOpen, addStepSelectValue } = this.state;

		const types = [];
		for (let item in STEP_TYPE) {
			if (isNaN(Number(item))) {
				types.push(item);
			}
		}

		return (
			<div id="editor">
				<Modal
					title="Add step"
					visible={addStepModalOpen}
					onOk={() => this.addStep()}
					onCancel={() => this.setState({ addStepModalOpen: !addStepModalOpen })}
				>
					<Select
						onChange={(t: STEP_TYPE) => this.setState({ addStepSelectValue: t})}
						value={STEP_TYPE[addStepSelectValue]}
						style={{ width: '100%' }}
					>
						{types
							.map(k => (
								<Option key={k} value={k}>{k}</Option>
							))}
					</Select>
				</Modal>
				<Row>
					<Col span={5}>
						<div>
							<Button
								type="primary"
								icon={'plus'}
								onClick={() => this.setState({ addStepModalOpen: true })}
							>
								Add Step
							</Button>
							<Button
								type={'primary'}
								icon={'caret-right'}
								onClick={() => this.generate()}
							>
								Run
							</Button>
						</div>
						<StepList
							steps={steps}
							setter={this.setter}
							enabler={this.enabler}
							remover={this.removeStep}
						/>
					</Col>
					<Col span={19}>
						<canvas id="canvas"/>
					</Col>
				</Row>
			</div>
		);
	}
}