import { Parameter } from '../../definitions/parameters';

export async function filter3(canvas: HTMLCanvasElement, parameters: Parameter[]) {
	const w = canvas.width;
	const h = canvas.height;
	const context = canvas.getContext('2d');
	let i;

	if (!context) {
		throw new Error('Missing context');
	}

	const img = context.getImageData(0, 0, w, h);
	const pixels = img.data;

	for (i=0; i < pixels.length; i += 4) {
		pixels[i] = Math.max(pixels[i], pixels[i+1], pixels[i+2]);
	}

	context.putImageData(img, 0, 0);
}