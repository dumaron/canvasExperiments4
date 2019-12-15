import { STEP_TYPE } from '../definitions/steps';

const assignments = {
	[STEP_TYPE.LOAD_IMAGE]: 'Choose an image',
};

export function t(str: string): string {
	return assignments[str] || str;
}
