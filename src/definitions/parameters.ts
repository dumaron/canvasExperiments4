export enum PARAMETER_TYPE {
	PERCENTAGE,
	STRING,
	INTEGER,
	BOOLEAN,
	IMAGE,
}

function randInt(max: number): number {
	return Math.floor(Math.random() * max);
}

function randIntCurry(max: number): Function {
	return () => randInt(max);
}

interface BaseParameter {
	random: boolean;
	name: string;
}

export interface IntegerParameter extends BaseParameter {
	type: PARAMETER_TYPE.INTEGER;
	value: number;
}

export interface PercentageParameter extends BaseParameter {
	type: PARAMETER_TYPE.PERCENTAGE;
	value: number;
}

export interface BooleanParameter extends BaseParameter {
	type: PARAMETER_TYPE.BOOLEAN;
	value: boolean;
}

export interface StringParameter extends BaseParameter {
	type: PARAMETER_TYPE.STRING;
	value: string;
}

export interface ImageParameter extends BaseParameter {
	type: PARAMETER_TYPE.IMAGE;
	value: File | null;
}

export type Parameter =
	IntegerParameter |
	StringParameter |
	PercentageParameter |
	BooleanParameter |
	ImageParameter;

export const parametersData = {
	[PARAMETER_TYPE.PERCENTAGE]: {
		min: 0,
		max: 100,
		default: 0,
		random: randIntCurry(100),
	},
	[PARAMETER_TYPE.INTEGER]: {
		min: 0,
		max: 1024,
		default: 0,
		random: randIntCurry(1024),
	},
	[PARAMETER_TYPE.BOOLEAN]: {
		default: true,
		random: () => Math.random() >= .5,
	},
	[PARAMETER_TYPE.STRING]: {
		default: 'yolo swag',
		max: 30,
		random: () => {
			const length = randInt(30);
			Math.random().toString(36).substring(length);
		}
	},
	[PARAMETER_TYPE.IMAGE]: {
		default: null,
		random: () => null,
	}
};

export function generateParameter(name: string, type: PARAMETER_TYPE): Parameter {
	return  {
		type,
		name,
		random: false,
		value: parametersData[type].default
	} as any;
}