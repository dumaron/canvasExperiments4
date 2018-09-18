import React from 'react';
import { generateStep, Step, STEP_TYPE } from '../definitions/steps';
import { runSequence } from '../utils/engine';
import { Sidebar } from './Sidebar';

interface EditorProps {}

interface State {
	steps: Step[];
}

export class Editor extends React.PureComponent<EditorProps, State> {
	constructor(props: EditorProps) {
		super(props);

		this.state = {
			steps: [generateStep(STEP_TYPE.LOAD_IMAGE)],
		};
	}

	setter = (index: number, parameterName: string, value: any) => {
		const { steps } = this.state;
		const newSteps = steps.map((step, i) => {
			if (i === index) {
				// maybe use a more functional approach?
				const parameter = step.parameters.find((p) => p.name === parameterName);
				if (parameter) {
					parameter.value = value;
				}
			}
			return step;
		});

		this.setState({ steps: newSteps });
	};

	enabler = (index: number, disabled: boolean) => {
		const { steps } = this.state;
		const newSteps = steps.map((step, i) => {
			if (i === index) {
				step.disabled = disabled;
			}

			return step;
		});

		this.setState({ steps: newSteps });
	};

	generate = () => {
		const c = document.getElementById('canvas') as HTMLCanvasElement;
		runSequence(c, this.state.steps);
	};

	addStep = (stepType: STEP_TYPE) => {
		const { steps } = this.state;
		this.setState({
			steps: steps.concat([generateStep(stepType)]),
		});
	};

	removeStep = (index: number) => {
		const { steps } = this.state;
		this.setState({
			steps: steps.filter((e, i) => i !== index),
		});
	};

	render() {
		const { steps } = this.state;

		const types = [];
		for (let item in STEP_TYPE) {
			if (isNaN(Number(item))) {
				types.push(item);
			}
		}

		return (
			<div id="editor">
				<Sidebar
					run={this.generate}
					steps={steps}
					add={this.addStep}
					setter={this.setter}
					toggler={this.enabler}
					remover={this.removeStep}
				/>
				<div>
					<canvas id="canvas" />
				</div>
			</div>
		);
	}
}
