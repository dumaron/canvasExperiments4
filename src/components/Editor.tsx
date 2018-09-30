import React from 'react';
import { generateStep, Step, STEP_TYPE } from '../definitions/steps';
import { runSequence } from '../utils/engine';
import { Sidebar } from './Sidebar';
import { arrayMove } from 'react-sortable-hoc';
import { registerClass } from '../utils/css-manager';

interface EditorProps {}

interface State {
	steps: Step[];
	zoom: number;
}

const style = registerClass(
	() => `
	display: flex;
	justify-content: center;
	align-items: center;
`,
);

export class Editor extends React.PureComponent<EditorProps, State> {
	constructor(props: EditorProps) {
		super(props);

		this.state = {
			steps: [generateStep(STEP_TYPE.LOAD_IMAGE)],
			zoom: 1,
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

	changeOrder = ({ oldIndex, newIndex }: any) => {
		// TODO fix this any
		const { steps } = this.state;
		this.setState({
			steps: arrayMove(steps, oldIndex, newIndex),
		});
	};

	zoom = (increase: boolean) => {
		const { zoom } = this.state;
		const step = 0.3;
		let newZoom = zoom;

		if (increase) {
			newZoom += step;
		} else {
			newZoom -= step;
			if (newZoom < step) newZoom = step;
		}
		this.setState({ zoom: newZoom });
	};

	render() {
		const { steps, zoom } = this.state;

		const types = [];
		for (let item in STEP_TYPE) {
			if (isNaN(Number(item))) {
				types.push(item);
			}
		}

		return (
			<div id="editor" className={style}>
				<Sidebar
					run={this.generate}
					steps={steps}
					add={this.addStep}
					setter={this.setter}
					toggler={this.enabler}
					remover={this.removeStep}
					changeOrder={this.changeOrder}
					zoom={this.zoom}
				/>
				<div>
					<canvas id="canvas" style={{ zoom }} />
				</div>
			</div>
		);
	}
}
