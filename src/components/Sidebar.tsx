import * as React from 'react';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Step, STEP_TYPE } from '../definitions/steps';
import { StepList } from './StepList';
import { registerClass } from '../utils/css-manager';
import { claraThemeType } from '../utils/theme';

const sidebarClass = registerClass(
	(t: claraThemeType) => `
  height: 100%;
  width: 300px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${t.backgroundColor};
  z-index: 2;
`,
);

interface SidebarProps {
	run: () => void;
	steps: Step[];
	add: (step: STEP_TYPE) => void;
	setter: (index: number, parameterName: string, value: any) => void;
	toggler: (index: number, disabled: boolean) => void;
	remover: (index: number) => void;
	changeOrder: (...args: any[]) => void;
	zoom: (increase: boolean) => void;
}

interface SidebarState {
	addStepSelectValue: STEP_TYPE;
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
	constructor(props: SidebarProps) {
		super(props);

		this.state = {
			addStepSelectValue: STEP_TYPE.GRAYSCALE_1,
		};
	}

	render() {
		const { run, steps, add, setter, toggler, remover, changeOrder, zoom } = this.props;
		const { addStepSelectValue } = this.state;

		return (
			<div className={sidebarClass}>
				<div>
					<Button onClick={run}>Run</Button>
					<Button onClick={() => zoom(false)}>Zoom out</Button>
					<Button onClick={() => zoom(true)}>Zoom in</Button>
				</div>

				<StepList
					steps={steps}
					setter={setter}
					enabler={toggler}
					remover={remover}
					changeOrder={changeOrder}
				/>

				<div>
					<Select
						choices={[
							{ label: 'Grayscale 1', value: STEP_TYPE.GRAYSCALE_1 },
							{ label: 'Color 1', value: STEP_TYPE.COLOR_1 },
							{ label: 'Color 2', value: STEP_TYPE.COLOR_2 },
							{ label: 'Color 3', value: STEP_TYPE.COLOR_3 },
							{ label: 'Color 4', value: STEP_TYPE.COLOR_4 },
							{ label: 'Squares 1', value: STEP_TYPE.SQUARES_1 },
							{ label: 'Squares 2', value: STEP_TYPE.SQUARES_2 },
							{ label: 'Squares 3', value: STEP_TYPE.SQUARES_3 },
							{ label: 'Squares 4', value: STEP_TYPE.SQUARES_4 },
							{ label: 'Squares 5', value: STEP_TYPE.SQUARES_5 },
							{ label: 'Lines 1', value: STEP_TYPE.LINES_1 },
						]}
						onChange={(v) => this.setState({ addStepSelectValue: v as STEP_TYPE })}
					/>
					<Button onClick={() => add(addStepSelectValue)}>Add</Button>
				</div>
			</div>
		);
	}
}
