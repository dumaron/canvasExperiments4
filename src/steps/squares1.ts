import { Parameter } from '../definitions/parameters';
import { get } from '../utils/steps';
import { getIndex, pixelToHex } from '../utils/misc';

export async function squares1(
	canvas: HTMLCanvasElement,
	parameters: Parameter[],
) {
	const w = canvas.width;
	const h = canvas.height;
	const context = canvas.getContext('2d');
	const c1 = get('limit', parameters) as number;
	const magicNumber = Math.floor(w / c1);
	if (context === null) throw new Error('Context is null');
	const img = context.getImageData(0, 0, w, h);
	const pixels = img.data;
	let x, y, index;

	for (y = 0; y <= h; y += magicNumber) {
		for (x = 0; x <= w; x += magicNumber) {
			index = getIndex(x, y, w);
			context.fillStyle = pixelToHex(
				pixels[index],
				pixels[index + 1],
				pixels[index + 2],
			);
			context.fillRect(x, y, magicNumber, magicNumber);
		}
	}
}
