import { Parameter, generateParameter, PARAMETER_TYPE } from './parameters';

export enum STEP_TYPE {
	LOAD_IMAGE = 'LOAD_IMAGE',
	GRAYSCALE_1 = 'GRAYSCALE_1',
	COLOR_1 = 'COLOR_1',
	COLOR_2 = 'COLOR_2',
	COLOR_3 = 'COLOR_3',
	COLOR_4 = 'COLOR_4',
	SQUARES_1 = 'SQUARES_1',
	SQUARES_2 = 'SQUARES_2',
  SQUARES_3 = 'SQUARES_3',
  SQUARES_4 = 'SQUARES_4',
  LINES_1 = 'LINES_1',
}

export interface Step {
	type: STEP_TYPE;
	disabled: boolean;
	parameters: Parameter[];
}

function generateParameters(type: STEP_TYPE): Parameter[] {
	switch (type) {
		case STEP_TYPE.LOAD_IMAGE:
			return [generateParameter('image', PARAMETER_TYPE.IMAGE)];
		case STEP_TYPE.GRAYSCALE_1:
			return [
				generateParameter('minOrMax', PARAMETER_TYPE.BOOLEAN),
				generateParameter('coefficient', PARAMETER_TYPE.INTEGER),
			];
		case STEP_TYPE.COLOR_1:
			return [
				generateParameter('minOrMax', PARAMETER_TYPE.BOOLEAN),
				generateParameter('limit', PARAMETER_TYPE.PERCENTAGE, 50),
				generateParameter('multiplier', PARAMETER_TYPE.PERCENTAGE, 75),
			];
		case STEP_TYPE.COLOR_3:
			return [generateParameter('limit', PARAMETER_TYPE.PERCENTAGE, 20)];
		case STEP_TYPE.COLOR_4:
			return [generateParameter('total', PARAMETER_TYPE.PERCENTAGE, 50)];
		case STEP_TYPE.SQUARES_1:
			return [generateParameter('limit', PARAMETER_TYPE.PERCENTAGE, 40)];
    case STEP_TYPE.SQUARES_2:
      return [generateParameter('limit', PARAMETER_TYPE.PERCENTAGE, 40)];
    case STEP_TYPE.SQUARES_3:
      return [
        generateParameter('limit', PARAMETER_TYPE.PERCENTAGE, 80),
        generateParameter('step', PARAMETER_TYPE.PERCENTAGE, 50)
      ];
    case STEP_TYPE.SQUARES_4:
      return [generateParameter('divider', PARAMETER_TYPE.INTEGER, 100)];
    case STEP_TYPE.LINES_1:
      return [generateParameter('divider', PARAMETER_TYPE.INTEGER, 100)];
    default:
			return [];
	}
}

export function generateStep(type: STEP_TYPE): Step {
	return {
		type,
		disabled: false,
		parameters: generateParameters(type),
	};
}
