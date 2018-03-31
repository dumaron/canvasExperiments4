import { Parameter, generateParameter, PARAMETER_TYPE } from './parameters';

export enum STEP_TYPE {
	LOAD_IMAGE,
	FILTER_1,
	FILTER_2,
	FILTER_3,
}

export interface Step {
	type: STEP_TYPE;
	disabled: boolean;
	parameters: Parameter[];
}

function generateParameters(type: STEP_TYPE): Parameter[] {
	switch (type) {
		case STEP_TYPE.LOAD_IMAGE:
			return [
				generateParameter('image', PARAMETER_TYPE.IMAGE),
			];
		case STEP_TYPE.FILTER_1:
			return [
				generateParameter('minOrMax', PARAMETER_TYPE.BOOLEAN),
			];
		default: return [];
	}
}

export function generateStep(type: STEP_TYPE): Step {
	return {
		type,
		disabled: false,
		parameters: generateParameters(type)
	};
}