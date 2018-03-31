import { Parameter } from '../definitions/parameters';

export function get(name: string, parameters: Parameter[]) {
	const tmp = parameters.find(p => p.name === name);
	if (!tmp) {
		throw new Error('Missing parameter');
	}

	return tmp.value;
}