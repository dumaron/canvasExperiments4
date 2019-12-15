import { Parameter } from '../definitions/parameters';
import { get } from '../utils/steps';
import { avg, getIndex, rotate } from '../utils/misc';
import SimplexNoise from 'simplex-noise';

export async function lines1(canvas: HTMLCanvasElement, parameters: Parameter[]) {
	const w = canvas.width;
	const h = canvas.height;
	const context = canvas.getContext('2d');
	const divider = get('divider', parameters) as number;
	const magicNumber = Math.floor(w / divider);
	if (context === null) throw new Error('Context is null');
	const img = context.getImageData(0, 0, w, h);
	const pixels = img.data;
	const lines = [];
	const simplex = new SimplexNoise(Math.random().toString());
	let x, y, index, i, darkness, avgCol, line, perlin, endX, endY, rotation;

	for (y = 0; y <= h; y += magicNumber) {
		for (x = 0; x <= w; x += magicNumber) {
			index = getIndex(x, y, w);
			avgCol = avg([pixels[index], pixels[index + 1], pixels[index + 2]]);
			darkness = ((255 - avgCol) / 255) * 100;
			lines.push({
				x,
				y,
        darkness,
			});
		}
	}

	// rendo bianca la canvas.
	for (i = 0; i < pixels.length; i += 4) {
		pixels[i] = pixels[i + 1] = pixels[i + 2] = 255;
	}
  context.putImageData(img, 0, 0);

	context.strokeStyle = '#000000';

	for (i = 0; i < lines.length; i++) {
		line = lines[i];
		context.beginPath();
		context.moveTo(line.x, line.y);
		perlin = simplex.noise2D(i, i);
		rotation = rotate(0, 0, line.darkness, 0, perlin * 45);
		endX = rotation.x;
		endY = rotation.y;
		context.lineTo(endX + line.x, endY + line.y);
		context.lineWidth = line.darkness / 100;
		context.stroke();
	}
}
