import { Parameter } from '../../definitions/parameters';
import { get } from '../steps';

export async function filter4(canvas: HTMLCanvasElement, parameters: Parameter[]) {
	const w = canvas.width;
	const h = canvas.height;
	const context = canvas.getContext('2d');
	const limit = get('limit', parameters) as number;
	let i, distance;

	if (!context) {
		throw new Error('Missing context');
	}

	const img = context.getImageData(0, 0, w, h);
	const pixels = img.data;

	for (i=0; i < pixels.length; i += 4) {
		distance = ((pixels[i] - pixels[i + 1]) + (pixels[i] - pixels[i + 2])) / 2;
		pixels[i] *= distance > limit ? 1.1 : .9;
	}

	context.putImageData(img, 0, 0);
}