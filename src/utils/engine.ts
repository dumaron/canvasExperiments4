import { Step, STEP_TYPE } from '../definitions/steps';
import { filter1 } from '../steps/filter1';
import { loadImage } from '../steps/loadImage';
import { filter2 } from '../steps/filter2';
import { filter3 } from '../steps/filter3';
import { filter4 } from '../steps/filter4';
import { filter5 } from '../steps/filter5';
import { squares1 } from '../steps/squares1';
import { squares2 } from '../steps/squares2';
import { squares3 } from '../steps/squares3';
import { lines1 } from '../steps/lines1';
import { squares4 } from '../steps/squares4';
import { squares5 } from '../steps/squares5';

const stepToFunction = {
	[STEP_TYPE.GRAYSCALE_1]: filter1,
	[STEP_TYPE.COLOR_1]: filter2,
	[STEP_TYPE.COLOR_2]: filter3,
	[STEP_TYPE.COLOR_3]: filter4,
	[STEP_TYPE.COLOR_4]: filter5,
	[STEP_TYPE.LOAD_IMAGE]: loadImage,
	[STEP_TYPE.SQUARES_1]: squares1,
	[STEP_TYPE.SQUARES_2]: squares2,
	[STEP_TYPE.SQUARES_3]: squares3,
	[STEP_TYPE.SQUARES_4]: squares4,
	[STEP_TYPE.SQUARES_5]: squares5,
	[STEP_TYPE.LINES_1]: lines1,
};

export async function runSequence(canvas: HTMLCanvasElement, steps: Step[]) {
	let i, f, step;

	const stepsEnabled = steps.filter((s) => !s.disabled);

	for (i = 0; i < stepsEnabled.length; i++) {
		step = stepsEnabled[i];
		f = stepToFunction[step.type];

		if (!f) {
			throw new Error('Step function not found');
		}

		await f(canvas, step.parameters);
	}
}
