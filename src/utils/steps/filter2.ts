import { Parameter } from '../../definitions/parameters';
import { get } from '../steps';

export async function filter2(canvas: HTMLCanvasElement, parameters: Parameter[]) {
	const w = canvas.width;
	const h = canvas.height;
	const context = canvas.getContext('2d');
	const useMax = get('minOrMax', parameters);
	const limit = get('limit', parameters) as number;
	const mul = get('multiplier', parameters) as number;
	const policy = useMax ? Math.max : Math.min;
	let parsed, i, tmp;

	if (!context) {
		throw new Error('Missing context');
	}

	const img = context.getImageData(0, 0, w, h);
	const pixels = img.data;

	for (i=0; i < pixels.length; i += 4) {
		parsed = policy(pixels[i], pixels[i+1], pixels[i+2]);
		tmp = Math.floor(Math.min(255, mul / 100 * 255 + parsed));
		pixels[i+2] = pixels[i+1] = parsed;
		pixels[i] = parsed > limit * 255/100 ? tmp : parsed;
	}

	context.putImageData(img, 0, 0);
}