import { Step, STEP_TYPE } from '../definitions/steps';
import { filter1 } from './steps/filter1';
import { loadImage } from './steps/loadImage';

const stepToFunction = {
	[STEP_TYPE.FILTER_1]: filter1,
	[STEP_TYPE.LOAD_IMAGE]: loadImage,
};

export async function runSequence(canvas: HTMLCanvasElement, steps: Step[]) {
	let i, f, step;

	const stepsEnabled = steps.filter(s => !s.disabled);

	for (i=0; i<stepsEnabled.length; i++) {
		step = stepsEnabled[i];
		f = stepToFunction[step.type];

		if (!f) {
			throw new Error('Step function not found');
		}

		await f(canvas, step.parameters);
	}
}