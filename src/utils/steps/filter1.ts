import { Parameter } from '../../definitions/parameters';
import { get } from '../steps';

export async function filter1(canvas: HTMLCanvasElement, parameters: Parameter[]) {
	const w = canvas.width;
	const h = canvas.height;
	const context = canvas.getContext('2d');
	const useMax = get('minOrMax', parameters);
	const policy = useMax ? Math.max : Math.min;
	let parsed, i;

	if (!context) {
		throw new Error('Missing context');
	}

	const img = context.getImageData(0, 0, w, h);
	const pixels = img.data;

	for (i=0; i < pixels.length; i += 4) {
		parsed = policy(pixels[i], pixels[i+1], pixels[i+2]);
		pixels[i] = pixels[i+1] = pixels[i+2] = parsed;
	}

	context.putImageData(img, 0, 0);
}